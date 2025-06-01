import { arg, extendType, nonNull, objectType } from 'nexus'
import { orderTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { Order } from '../types.ts'

export const orderListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field('orderList', {
			type: objectType({
				name: 'orderListQueryResult',
				definition(t) {
					t.nonNull.list.nonNull.field('items', { type: Order })
					t.nonNull.int('count')
				},
			}),
			args: {
				where: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				const items = await db.query.orderTable.findMany({
					where: helper.drizzle.conditions(orderTable, args.where),
					with: { orderItems: true },
				})
				console.log(items[4]?.orderItems)

				return { items, count: items.length }
			},
		})
	},
})
