import { arg, extendType, nonNull } from 'nexus'
import { type GraphQLContext } from '../index.ts'
import { Menu } from '../types.ts'

export const mutateMenuMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('mutateMenu', {
			type: Menu,
			args: {
				id: arg({ type: 'ID' }),
				values: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				return db.transaction().execute(async (trx) => {
					const item = await trx
						.insertInto('menu')
						.values({ id: helper.genUlid(), ...args.values })
						.returningAll()
						.executeTakeFirstOrThrow()

					return item
				})
			},
		})
	},
})
