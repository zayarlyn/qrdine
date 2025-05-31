import { extendType } from 'nexus'
import { type GraphQLContext } from './index.ts'
import { Menu } from './types.ts'

export const menuListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.nonNull.field('menuList', {
			type: Menu,
			args: {
				// filters: arg({ type: nonNull(PostFilters) }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db } = context.app

				return db.selectFrom('menu').selectAll().execute()
			},
		})
	},
})
