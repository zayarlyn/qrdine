import { and, eq, SQL } from 'drizzle-orm'
import fp from 'fastify-plugin'
import { monotonicFactory, type ULIDFactory } from 'ulid'

const helperPlugin = fp(async (app) => {
	const genUlid = monotonicFactory()

	const conditions = (table, where) => and(...Object.entries(where).map(([key, value]) => eq(table[key], value)))!

	app.decorate('helper', {
		genUlid,
		drizzle: {
			conditions,
		},
	})

	app.log.info('\x1b[34m[system] Helper plugin registered\x1b[0m')
})

export default helperPlugin

declare module 'fastify' {
	interface FastifyInstance {
		helper: {
			genUlid: ULIDFactory
			drizzle: {
				conditions: (table: any, where: any) => SQL<unknown>
			}
		}
	}
}
