import { arg, extendType, nonNull } from 'nexus'
import { orderItemTable, orderItemGroupTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { createQueryResultType, OrderItemGroupType } from '../types.ts'

const queryName = 'orderItemGroupList'

export const orderItemGroupListQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.field(queryName, {
			type: createQueryResultType(OrderItemGroupType, queryName),
			args: {
				where: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app

				const items = await db.query.orderItemGroupTable.findMany({
					where: helper.drizzle.conditions(orderItemGroupTable, args.where),
					with: {
						orderItems: { orderBy: orderItemTable.createdAt },
						order: {
							with: { seat: true },
						},
					},
				})

				return { items, count: items.length }
			},
		})
	},
})
