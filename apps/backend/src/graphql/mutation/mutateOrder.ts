import { arg, extendType, nonNull } from 'nexus'
import { type GraphQLContext } from '../index.ts'
import { OrderType } from '../types.ts'
import { menuTable, orderItemGroupTable, orderItemTable, orderTable } from '../../db/types.ts'
import { eq, inArray } from 'drizzle-orm'
import { z } from 'zod/v4'

const valuesSchema = z.object({
	// deletedAt: z.boolean().optional(),
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

// handle create/update/delete of order, handle create/delete of order_items and order_item_group
export const mutateOrder = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('mutateOrder', {
			type: OrderType,
			args: {
				id: arg({ type: 'ID' }),
				values: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, { app, pubsub }: GraphQLContext) => {
				const { db, helper, log } = app
				const { orderItems, id, ...values } = args.values

				pubsub.publish({ topic: 'order-updated', payload: Date.now() })

				helper.validate(args.values, valuesSchema)

				return helper.drizzle.catchTransaction(async (trx) => {
					let order
					if (id) {
						order = await trx.query.orderTable.findFirst({
							where: eq(orderTable.id, id),
						})
					} else {
						const [result] = await trx
							.insert(orderTable)
							.values({ id: helper.genUlid(), ...values })
							.onConflictDoNothing()
							.returning()
						order = result
					}

					const menuIds = orderItems.map((item) => item.menuId)
					const menus = await trx.select().from(menuTable).where(inArray(menuTable.id, menuIds)).execute()
					const [orderItemGroup] = await trx
						.insert(orderItemGroupTable)
						.values({ id: helper.genUlid(), orderId: order.id, status: 'draft' })
						.returning()
						.execute()

					let total = 0
					for (const item of orderItems) {
						// const dbOrderItem = await trx.query.orderItemTable.findFirst({ where: eq(orderItemTable.id, item.id) })
						// const menuOrderItem = await trx.query.orderItemTable.findFirst({
						// 	where: helper.drizzle.conditions(orderItemTable, {
						// 		orderId: order.id,
						// 		menuId: item.menuId,
						// 	}),
						// })
						const menu = menus.find((menu) => menu.id === item.menuId)
						if (!menu) throw new Error(`Menu with id ${item.menuId} not found`)

						total += +menu.price * item.quantity

						// if (menuOrderItem) {
						// 	await trx
						// 		.update(orderItemTable)
						// 		.set({ quantity: menuOrderItem.quantity + item.quantity })
						// 		.where(eq(orderItemTable.id, menuOrderItem.id))
						// 		.execute()
						// } else
						// if (dbOrderItem) {
						// 	await trx
						// 		.update(orderItemTable)
						// 		.set({
						// 			menuPrice: menu.price,
						// 			quantity: item.quantity,
						// 			status: item.status || 'draft',
						// 		})
						// 		.where(eq(orderItemTable.id, dbOrderItem.id))
						// 		.execute()
						// } else {
						const r = await trx
							.insert(orderItemTable)
							.values({
								id: helper.genUlid(),
								orderId: order.id,
								groupId: orderItemGroup.id,

								menuId: menu.id,
								menuPrice: menu.price,
								quantity: item.quantity,
								// status: item.status || 'draft',
							})
							.execute()
						// }
					}
					await trx.update(orderTable).set({ total: total.toString() }).where(eq(orderTable.id, order.id))

					return order
				})
			},
		})
	},
})
