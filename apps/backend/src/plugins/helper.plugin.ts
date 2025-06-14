import { and, eq } from 'drizzle-orm'
import fp from 'fastify-plugin'
import { monotonicFactory } from 'ulid'
import { type Transaction } from '../app.module.ts'
import { z } from 'zod/v4'
import { menuTable, orderItemGroupTable, orderItemTable, orderTable, seatTable, staffTable } from '../db/types.ts'

const tables = { orderItemGroupTable, orderItemTable, orderTable, menuTable, staffTable, seatTable }

const helperPlugin = fp(async (app) => {
	const genUlid = monotonicFactory()

	const conditions = (table, where) => and(...Object.entries(where).map(([key, value]) => eq(table[key], value)))!

	const findOneOrCreate = async (trx: Transaction, tableName: keyof Transaction['query'], where, values) => {
		const table = tables[tableName]
		const existing = await trx.query[tableName as string].findFirst({ where: conditions(table, where) })
		if (existing) return existing
		const [created] = await trx
			.insert(table)
			.values({ id: genUlid(), ...values })
			.returning()
		return created
	}

	const updateOrCreate = async (trx: Transaction, tableName: keyof Transaction['query'], where, values) => {
		const existing = await trx.query.orderItemTable.findFirst({ where: conditions(orderItemTable, where) })
		if (existing) {
			const [updated] = await trx
				.update(orderItemTable)
				.set(values)
				.where(conditions(orderItemTable, where))
				.returning()
			return updated
		} else {
			const [created] = await trx
				.insert(orderItemTable)
				.values({ id: genUlid(), ...values })
				.returning()
			return created
		}
	}

	app.decorate('helper', {
		genUlid,
		drizzle: {
			conditions,
			findOneOrCreate,
			updateOrCreate,
			catchTransaction: (fn: (trx: Transaction) => any) => {
				return app.db.transaction(async (trx) => {
					try {
						return await fn(trx)
					} catch (err) {
						app.log.error(err)
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
