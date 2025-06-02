import { arg, extendType, nonNull } from 'nexus'
import { menuTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { MenuType } from '../types.ts'

export const mutateMenu = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('mutateMenu', {
			type: MenuType,
			args: {
				id: arg({ type: 'ID' }),
				values: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				return helper.drizzle.catchTransaction(async (trx) => {
					const [item] = await trx
						.insert(menuTable)
						.values({ id: helper.genUlid(), ...args.values })
						.returning()

					return item
				})
			},
		})
	},
})
