import { drizzle } from 'drizzle-orm/node-postgres'
import fp from 'fastify-plugin'
import { Pool } from 'pg'
import * as schema from './types.ts'

const dbPlugin = fp(async (app) => {
	const { database } = app.config

	const pool = new Pool({
		database: database.name,
		host: database.host,
		user: database.user,
		password: database.password,
		port: database.port,
		max: 10,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000,
	})

	try {
		await pool.connect()
	} catch (error) {
		app.log.error('Failed to connect to database:', error)
		throw error
	}

	const db = drizzle(pool, { schema })

	app.decorate('db', db)

	app.log.info('\x1b[34m[system] Database (drizzle postgres) plugin registered\x1b[0m')
})

export default dbPlugin
