import { arg, extendType, nonNull } from 'nexus'
import { menuTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { createQueryResultType, MenuType } from '../types.ts'

const queryName = 'menuList'

export const menuListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field(queryName, {
			type: createQueryResultType(MenuType, queryName),
			args: {
				where: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				const items = await db.query.menuTable.findMany({
					where: helper.drizzle.conditions(menuTable, args.where),
				})
				console.log(items)

				return { items, count: items.length }
			},
		})
	},
})
