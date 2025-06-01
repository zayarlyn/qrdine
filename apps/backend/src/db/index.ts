import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import fp from 'fastify-plugin'
import { Pool } from 'pg'
import * as schema from './types.ts'

const dbPlugin = fp(async (app) => {
	const db = drizzle({
		client: new Pool({
			database: 'qrdine',
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: 5432,
			max: 10,
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 2000,
		}),
		schema,
	})

	app.decorate('db', db)

	app.log.info('\x1b[34m[system] Database (kysley postgres) plugin registered\x1b[0m')
})

export default dbPlugin
