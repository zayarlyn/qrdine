import { SQL, type ExtractTablesWithRelations } from 'drizzle-orm'
import type { NodePgDatabase, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import { type PgTransaction } from 'drizzle-orm/pg-core'
import type { ULIDFactory } from 'ulid'
import { z } from 'zod/v4'
import * as schemas from './db/types.ts'

export type Transaction = PgTransaction<
	NodePgQueryResultHKT,
	typeof schemas,
	ExtractTablesWithRelations<typeof schemas>
>

declare module 'fastify' {
	interface FastifyInstance {
		db: NodePgDatabase<typeof schemas>
		helper: {
			genUlid: ULIDFactory
			drizzle: {
				conditions: (table: any, where: any) => SQL<unknown>
				catchTransaction: (fn: (trx: Transaction) => any) => any
			}
			validate: (object: any, schema: z.ZodType) => any
		}
	}
}
