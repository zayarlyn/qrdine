import { faker } from '@faker-js/faker'
import { config } from 'dotenv'
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

config({ path: process.env.ENV_FILE_PATH })

// const envFilePath = process.env.ENV_FILE_PATH!
// config({ path: envFilePath })

const getDataSource = async ({ db }: { db: string }) => {
  console.log({ db })
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL!.replace(process.env.DB_NAME!, db),
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

  const sampleMenus = _.range(11).map(() => ({ id: ulid(), name: faker.food.dish(), price: faker.commerce.price() }))
  const menus = await em.save(Menu, sampleMenus)
  const staff = await em.save(Staff, { id: '01KGHDXHM1QPBQDMAVXV0E9RN3', name: 'Ning Ning', userId: ulid() })
  const seat = await em.save(Seat, { id: '01KGHE8GRTK8S5ZQ3CC1MMZVDF', name: 'Table 1' })

  const order = await em.save(Order, { id: ulid(), name: 'Order 1', staffId: staff.id, seatId: seat.id, total: 0, paid: 0 })

  console.log('\nSeeded data:')
  console.log('Menus:', menus.length)
  console.log('Staff:', staff.name)
  console.log('Seat:', seat.name)
  console.log('Order:', order.name)
}

export async function resetNSeed({ dbName }: { dbName: string }) {
  const sql = readFileSync(join(cwd(), '/scripts/tenant.sql'), 'utf-8')

  const [postgresDs, postgresQr] = await getDataSource({ db: 'postgres' })

  // create database and populate schema
  await createDb(postgresQr, dbName)
  const [ds, qr] = await getDataSource({ db: dbName })
  await qr.query(sql)

  await seed({ ds })

  // cleanup
  await Promise.all([postgresDs, ds].map((ds) => ds.destroy()))
  console.log('\n>>>>>> All done! <<<<<<\n\n\n')
}

// check if called directly from command line
const FILE = require.main?.filename
const isCLI = FILE === process.argv[1]

if (isCLI) void resetNSeed({ dbName: process.env.DB_NAME! })
