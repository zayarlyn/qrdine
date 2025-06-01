import { arg, extendType, nonNull, objectType } from 'nexus'
import { menuTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { MenuType } from '../types.ts'

export const menuListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field('menuList', {
			type: objectType({
				name: 'menuListQueryResult',
				definition(t) {
					t.nonNull.list.nonNull.field('items', { type: MenuType })
					t.nonNull.int('count')
				},
			}),
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
