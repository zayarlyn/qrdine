import { arg, extendType, nonNull } from 'nexus'
import { orderTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { createQueryResultType, OrderType } from '../types.ts'

const queryName = 'orderList'

export const orderListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field(queryName, {
			type: createQueryResultType(OrderType, queryName),
			args: {
				where: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				const items = await db.query.orderTable.findMany({
					where: helper.drizzle.conditions(orderTable, args.where),
					with: { orderItems: true },
				})

				return { items, count: items.length }
			},
		})
	},
})
