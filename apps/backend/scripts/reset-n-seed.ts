import { faker } from '@faker-js/faker'
import 'dotenv/config'
import { readFileSync } from 'fs'
import _ from 'lodash'
import { join } from 'path'
import { cwd } from 'process'
import { Menu } from '../src/db/entities/MenuEntity'
import { Order } from '../src/db/entities/OrderEntity'
import { OrderItem } from '../src/db/entities/OrderItemEntity'
import { Seat } from '../src/db/entities/SeatEntity'
import { Staff } from '../src/db/entities/StaffEntity'
import { DataSource, QueryRunner } from 'typeorm'
import { monotonicFactory } from 'ulid'

// const envFilePath = process.env.ENV_FILE_PATH!
// config({ path: envFilePath })

const getDataSource = async ({ db }: { db: string }) => {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL!.replace('qrdine', db),
    entities: [Menu, Staff, Seat, Order, OrderItem],
  })
  await dataSource.initialize()
  return [dataSource, dataSource.createQueryRunner()] as [typeof dataSource, QueryRunner]
}

const createDb = async (qr: QueryRunner, dbName: string) => {
  await qr.query(`DROP DATABASE IF EXISTS ${dbName}`)
  await qr.query(`CREATE DATABASE ${dbName}`)
}

const ulid = monotonicFactory()

async function seed({ ds }: { ds: DataSource }) {
  const em = ds.createEntityManager()

  const sampleMenus = _.range(3).map(() => ({ id: ulid(), name: faker.food.dish(), price: faker.commerce.price() }))
  const menus = await em.save(Menu, sampleMenus)
  const staff = await em.save(Staff, { id: ulid(), name: 'Ning Ning', userId: ulid() })
  const seat = await em.save(Seat, { id: ulid(), name: 'Table 1' })

  const order = await em.save(Order, { id: ulid(), name: 'Order 1', staffId: staff.id, seatId: seat.id, total: 0, paid: 0 })

  console.log('\nSeeded data:')
  console.log('Menus:', menus.length)
  console.log('Staff:', staff.name)
  console.log('Seat:', seat.name)
  console.log('Order:', order.name)
}

export async function resetNSeed({ dbName = 'qrdine' }: { dbName?: string } = {}) {
  const sql = readFileSync(join(cwd(), '/scripts/tenant.sql'), 'utf-8')

  const [postgresDs, postgresQr] = await getDataSource({ db: 'postgres' })

  // create database and populate schema
  await createDb(postgresQr, dbName)
  const [ds, qr] = await getDataSource({ db: dbName })
  await qr.query(sql)

  await seed({ ds })

  // cleanup
  await Promise.all([postgresDs, ds].map((ds) => ds.destroy()))
  console.log('\n>>>>>> All done! <<<<<<\n')
}

// check if called directly from command line
const FILE = require.main?.filename
const isCLI = FILE === process.argv[1]

if (isCLI) void resetNSeed()
