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

      const order = await db.findOneOrCreate(Order, { id }, { withDeleted: true, relations: { orderItems: true } })
      await this.handleDeletedAt(order, deletedAt)

      const menus = await db.find(Menu, { withDeleted: false })

      const itemsToSave: OrderItem[] = []
      for (const item of values.orderItems || []) {
        if (menus.findIndex((m) => m.id === item.menuId) === -1) {
          throw new Error(`Menu item with id ${item.menuId} not found`)
        }
        let existingItem = order.orderItems.find((oi) => oi.menuId === item.menuId)
        if (existingItem) {
          if (item.deletedAt) {
            await existingItem.softRemove()
          } else {
            existingItem.quantity = item.quantity
          }
        } else {
          existingItem = db.build(OrderItem, item)
        }
        itemsToSave.push(existingItem)
        delete values.orderItems
        delete values.total
      }
      await db.save(OrderItem, itemsToSave)

      order.fill(values)
      await db.save(Order, order)

      return order
    })
  }
}
