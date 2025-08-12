import { faker } from '@faker-js/faker'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Pool } from 'pg'
import { cwd } from 'process'
import { menuTable, orderTable, seatTable, staffTable } from '../db/drizzle-schema.ts'
import { getEnv } from '../configs/env.config.ts'

const [config] = getEnv()

const getDb = (name: string) => {
	const pool = new Pool({
		database: name || 'postgres',
		host: config!.database.host,
		user: config!.database.user,
		password: config!.database.password,
		port: config!.database.port,
	})

	return drizzle(pool)
}

const setupDb = async () => {
	// Connect to postgres to create/drop database
	const pgDb = getDb('postgres')

	// Drop and recreate database
	await pgDb.execute(sql.raw(`DROP DATABASE IF EXISTS "${config!.database.name}"`))
	await pgDb.execute(sql.raw(`CREATE DATABASE "${config!.database.name}"`))

	// Connect to the new database
	const db = getDb(config!.database.name)

	// Run migrations (assuming you have migrations set up)
	// await migrate(db, { migrationsFolder: './drizzle' })
	await db.execute(sql.raw(readFileSync(join(cwd(), 'src/db/merchant-schema.sql'), 'utf-8')))
	console.log('<--- [2/1] Migrated schema --->')

	// Seed data
	await db.transaction(async (tx) => {
		await tx.insert(staffTable).values({
			id: '01JVYZE7P5H7ZBYCH6BMN87TMC',
			name: faker.person.fullName(),
		})

		await tx.insert(menuTable).values([
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMD',
				name: faker.food.dish(),
				description: faker.food.description(),
				price: faker.commerce.price(),
			},
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMB',
				name: faker.food.dish(),
				description: faker.food.description(),
				price: faker.commerce.price(),
			},
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMC',
				name: faker.food.dish(),
				description: faker.food.description(),
				price: faker.commerce.price(),
			},
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMA',
				name: faker.food.dish(),
				description: faker.food.description(),
				price: faker.commerce.price(),
			},
		])

		await tx.insert(seatTable).values([
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TME',
				name: faker.commerce.productName(),
			},
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMF',
				name: faker.commerce.productName(),
			},
		])

		await tx.insert(orderTable).values([
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMF',
				seatId: '01JVYZE7P5H7ZBYCH6BMN87TME',
				name: faker.person.fullName(),
			},
			{
				id: '01JVYZE7P5H7ZBYCH6BMN87TMG',
				seatId: '01JVYZE7P5H7ZBYCH6BMN87TMF',
				name: faker.person.fullName(),
			},
		])
	})

	console.log('<--- [2/2] Seeded db 🥳 --->')
	process.exit(0)
}

setupDb()
