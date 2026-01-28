import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Seat, SeatType } from 'src/db/entities/SeatEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'
import { DbService } from 'src/db/db.service'

@ObjectType()
export class SeatListType extends PaginatedResponse(SeatType) {}

@Resolver(() => SeatType)
export class SeatListQueryResolver extends BaseListQuery {
  constructor(protected dbService: DbService) {
    super(dbService)
  }

  @Query(() => SeatListType, { name: 'seatList' })
  async resolve(@Args() args: BaseListArgs) {
    const items = await this.doListQuery(Seat, args)

    return this.formatResponse(items)
  }
}
