import { JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { Menu } from './MenuEntity'
import { Order } from './OrderEntity'
import { Float } from '@nestjs/graphql'

export enum OrderItemStatusEnum {
  draft = 'draft',
  confirmed = 'confirmed',
  canceled = 'canceled',
  fulfilled = 'fulfilled',
}

@EntityObjectType({ name: 'order_item' }, { name: 'OrderItemType' })
export class OrderItem extends BaseEntity {
  @ColumnField({ type: 'varchar', length: 10 }, {})
  status: OrderItemStatusEnum = OrderItemStatusEnum.draft

  @ColumnField({ type: 'int' }, {})
  quantity: number

  @ColumnField({ name: 'menu_price', type: 'decimal', precision: 2, default: null }, {}, () => Float)
  menuPrice: number

  @ColumnField({ nullable: false, name: 'order_id' }, {})
  orderId: string

  @ColumnField({ nullable: false, name: 'menu_id' }, {})
  menuId: string

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Menu, (menu) => menu.orderMenuItems)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu
}

export const OrderItemType = OrderItem
