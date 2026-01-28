import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Order, OrderType } from 'src/db/entities/OrderEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'
import { DbService } from 'src/db/db.service'

@ObjectType()
export class OrderListType extends PaginatedResponse(OrderType) {}

@Resolver(() => OrderType)
export class OrderListQueryResolver extends BaseListQuery {
  constructor(protected dbService: DbService) {
    super(dbService)
  }

  @Query(() => OrderListType, { name: 'orderList' })
  async resolve(@Args() args: BaseListArgs) {
    const items = await this.doListQuery(Order, args)

    return this.formatResponse(items)
  }
}
