import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import type { DB } from './types.ts'
import fp from 'fastify-plugin'

const dbPlugin = fp(async (app) => {
	const dialect = new PostgresDialect({
		pool: new Pool({
			database: 'kokofu',
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: 5432,
			max: 10, // Start with 10 for most applications
			min: 2, // Minimum 2 connections always ready
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 2000, // Fail fast if can't connect
		}),
	})

	const db = new Kysely<DB>({
		dialect,
	})

	app.decorate('db', db)

	app.log.info('\x1b[34m[system] Database (kysley postgres) plugin registered\x1b[0m')
})

export default dbPlugin

declare module 'fastify' {
	interface FastifyInstance {
		db: Kysely<DB>
	}
}
