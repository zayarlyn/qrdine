import { arg, extendType, nonNull } from 'nexus'
import { orderItemTable, orderTable } from '../../db/types.ts'
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
					with: {
						orderItems: { orderBy: orderItemTable.createdAt },
						orderItemGroups: {
							orderBy: orderItemTable.createdAt,
							with: { orderItems: { orderBy: orderItemTable.createdAt } },
						},
					},
				})

				return { items, count: items.length }
			},
		})
	},
})
