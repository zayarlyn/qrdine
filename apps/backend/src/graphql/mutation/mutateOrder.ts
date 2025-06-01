import { arg, extendType, nonNull } from 'nexus'
import { type GraphQLContext } from '../index.ts'
import { OrderType } from '../types.ts'
import { menuTable, orderItemTable, orderTable } from '../../db/types.ts'
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

export const mutateOrder = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('mutateOrder', {
			type: OrderType,
			args: {
				id: arg({ type: 'ID' }),
				values: arg({ type: nonNull('Json') }),
			},
			resolve: async (_, args, context: GraphQLContext) => {
				const { db, helper } = context.app
				const { orderItems, ...values } = args.values

				helper.validate(args.values, valuesSchema)

				return helper.drizzle.catchTransaction(async (trx) => {
					const [order] = await trx
						.insert(orderTable)
						.values({ id: helper.genUlid(), ...values })
						.onConflictDoNothing()
						.returning()

					const menuIds = orderItems.map((item) => item.menuId)
					const menus = await trx.select().from(menuTable).where(inArray(menuTable.id, menuIds)).execute()

					for (const item of orderItems) {
						const dbOrderItem = await trx.query.orderItemTable.findFirst({ where: eq(orderItemTable.id, item.id) })
						const menuOrderItem = await trx.query.orderItemTable.findFirst({
							where: helper.drizzle.conditions(orderItemTable, {
								orderId: order.id,
								menuId: item.menuId,
							}),
						})
						const menu = menus.find((menu) => menu.id === item.menuId)
						if (!menu) throw new Error(`Menu with id ${item.menuId} not found`)

						if (menuOrderItem) {
							await trx
								.update(orderItemTable)
								.set({ quantity: menuOrderItem.quantity + item.quantity })
								.where(eq(orderItemTable.id, menuOrderItem.id))
								.execute()
						} else if (dbOrderItem) {
							await trx
								.update(orderItemTable)
								.set({
									menuPrice: menu.price,
									quantity: item.quantity,
									status: item.status || 'draft',
								})
								.where(eq(orderItemTable.id, dbOrderItem.id))
								.execute()
						} else {
							const r = await trx
								.insert(orderItemTable)
								.values({
									id: helper.genUlid(),
									orderId: item.orderId || order.id,
									menuId: menu.id,
									menuPrice: menu.price,
									quantity: item.quantity,
									status: item.status || 'draft',
								})
								.execute()
						}
					}

					return order
				})
			},
		})
	},
})
