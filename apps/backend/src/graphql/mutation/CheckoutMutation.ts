import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Order } from '../../db/entities/OrderEntity'
import { OrderItem } from '../../db/entities/OrderItemEntity'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { Menu } from '../../db/entities/MenuEntity'
import _ from 'lodash'

// order [Order]

// const seatId = '01KCNR438FSRT88AE84SMCVAJE'
// const staffId = '01KCNR438ECRFXPHMT7FZCMXB0'
// const orderId = '01KCNR438H7JGHMZ7R4BVQ30XC'
// const menuId = '01KCNR43834SS4WTWW7803BJZ6'

// const payload = {
//   seatId,
//   staffId,
//   orderItems: [
//     {
//       menuPrice: 109.49,
//       quantity: 2,
//       orderId,
//       menuId,
//       // name: 'Cheeseburger',
//     },
//   ],
// }

@Resolver(() => Order)
export class CheckoutMutationResolver extends BaseMutation {
  async handleDeletedAt(entity: Order, deletedAt: boolean) {
    if (deletedAt === true && !entity.deletedAt) {
      await entity.softRemove()
    } else if (deletedAt === false) {
      await entity.recover()
    }
    return entity
  }

  // Placeholder for checkout-related mutations
  @Mutation(() => Order, { name: 'checkoutMutation' })
  async resolve(@Args() args: BaseMutArgs) {
    return this.dbService.withTransaction(async (db) => {
      const { id, values } = args
      const deletedAt = _.get(values, 'deletedAt')

      const order = await db.findOneByIdOrCreate(Order, id, { relations: { orderItems: true } })

      // FIXME
      if (!order.createdAt) {
        order.fill({ ...values, orderItems: undefined })
        await order.save()
      }

      await this.handleDeletedAt(order, deletedAt)

      const menus = await db.find(Menu, { withDeleted: false })

      const itemsToSave: OrderItem[] = []
      let total = 0
      for (const item of values.orderItems || []) {
        const menu = menus.find((m) => m.id === item.menuId)
        if (!menu) throw new Error(`Menu item with id ${item.menuId} not found`)

        let existingItem = (order.orderItems || []).find((oi) => oi.menuId === item.menuId)
        if (existingItem) {
          if (item.deletedAt || item.quantity <= 0) {
            await existingItem.softRemove()
          } else {
            existingItem.quantity = item.quantity
          }
        } else {
          existingItem = db.build(OrderItem, { ...item, menuPrice: menu.price, orderId: order.id })
        }
        itemsToSave.push(existingItem)
        total += menu.price * item.quantity
      }

      if (itemsToSave.length > 0) {
        await db.save(OrderItem, itemsToSave)
      }

      values.total = total
      order.fill(values)
      await order.save()

      // cannot reload() in transaction, so manually fetch updated order
      return await db.findOne(Order, {
        withDeleted: true,
        where: { id: order.id },
        relations: { orderItems: true },
      })
    })
  }
}
