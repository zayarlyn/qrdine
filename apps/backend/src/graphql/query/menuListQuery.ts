import { arg, extendType, nonNull, objectType } from 'nexus'
import { type GraphQLContext } from '../index.ts'
import { Menu } from '../types.ts'

export const menuListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field('menuList', {
			type: objectType({
				name: 'menuListQueryResult',
				definition(t) {
					t.nonNull.list.nonNull.field('items', { type: Menu })
					t.nonNull.int('count')
				},
			}),
			args: {
				where: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db } = context.app

				const items = await db
					.selectFrom('menu')
					.selectAll()
					.where((q) => q.and(args.where))
					.execute()

				return { items, count: items.length }
			},
		})
	},
})
