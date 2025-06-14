import { inArray } from 'drizzle-orm'
import { arg, extendType, nonNull } from 'nexus'
import { z } from 'zod/v4'
import { menuTable, orderItemTable } from '../../db/types.ts'
import { type GraphQLContext } from '../index.ts'
import { OrderType } from '../types.ts'

const valuesSchema = z.object({
	// deletedAt: z.boolean().optional(),
	orderId: z.string(),
	orderItems: z
		.array(
			z.object({
				id: z.string().optional(),
				deletedAt: z.boolean().optional(),
				menuId: z.string(),
				quantity: z.number(),
				orderId: z.string().optional(),
			})
		)
		.optional(),
})

const mutationName = 'mutateOrderItemGroup'

export const mutateOrderItemGroup = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field(mutationName, {
			type: OrderType,
			args: {
				id: arg({ type: 'ID' }),
				values: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, { app, pubsub }: GraphQLContext) => {
				const { db, helper, log } = app
				const { orderItems, id, orderId, ...values } = args.values

				helper.validate(args.values, valuesSchema)

				return helper.drizzle.catchTransaction(async (trx) => {
					const orderItemGroup = await helper.drizzle.findOneOrCreate(
						trx,
						'orderItemGroupTable',
						{ id },
						{ orderId, status: 'draft' }
					)

					const menuIds = orderItems.map((item) => item.menuId)
					const menus = await trx.select().from(menuTable).where(inArray(menuTable.id, menuIds)).execute()
					// let total = 0

					for (const item of orderItems) {
						// const menuOrderItem = await trx.query.orderItemTable.findFirst({
						// 	where: helper.drizzle.conditions(orderItemTable, {
						// 		orderId: orderId,
						// 		menuId: item.menuId,
						// 	}),
						// })
						const menu = menus.find((menu) => menu.id === item.menuId)
						if (!menu) throw new Error(`Menu with id ${item.menuId} not found`)

						// if (menuOrderItem) {
						// 	await trx
						// 		.update(orderItemTable)
						// 		.set({ quantity: menuOrderItem.quantity + item.quantity })
						// 		.where(eq(orderItemTable.id, menuOrderItem.id))
						// 		.execute()
						// } else {
						await helper.drizzle.updateOrCreate(
							trx,
							'orderItemTable',
							{ id: item.id },
							{
								menuPrice: menu.price,
								quantity: item.quantity,
								groupId: orderItemGroup.id,
								menuId: menu.id,
								orderId,
							}
						)
					}
					// }

					return orderItemGroup
				})
			},
		})
	},
})
