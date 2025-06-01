import { and, eq } from 'drizzle-orm'
import fp from 'fastify-plugin'
import { monotonicFactory } from 'ulid'
import { type Transaction } from '../app.module.ts'
import { z } from 'zod/v4'

const helperPlugin = fp(async (app) => {
	const genUlid = monotonicFactory()

	const conditions = (table, where) => and(...Object.entries(where).map(([key, value]) => eq(table[key], value)))!

	app.decorate('helper', {
		genUlid,
		drizzle: {
			conditions,
			catchTransaction: (fn: (trx: Transaction) => any) => {
				return app.db.transaction(async (trx) => {
					try {
						return await fn(trx)
					} catch (err) {
						if (err.cause) {
							throw new Error(err.cause)
						} else {
							throw err
						}
					}
				})
			},
		},
		validate: (object: any, schema: z.ZodType) => {
			const result = schema.safeParse(object)
			if (result.error) {
				throw new Error(z.prettifyError(result.error))
			}
			return result.data
		},
	})

	app.log.info('\x1b[34m[system] Helper plugin registered\x1b[0m')
})

export default helperPlugin
