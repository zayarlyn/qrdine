import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Order, OrderType } from '../../db/entities/OrderEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'

@ObjectType()
export class OrderListType extends PaginatedResponse(OrderType) {}

@Resolver(() => OrderType)
export class OrderListQueryResolver extends BaseListQuery {
  @Query(() => OrderListType, { name: 'orderList' })
  async resolve(@Args() args: BaseListArgs) {
    const items = await this.doListQuery(Order, args, { withDeleted: true, relations: { orderItems: true } })

    return this.formatResponse(items)
  }
}
