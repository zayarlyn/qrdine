import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Staff, StaffType } from 'src/db/entities/StaffEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'

@ObjectType()
export class StaffListType extends PaginatedResponse(StaffType) {}

@Resolver(() => StaffType)
export class StaffListQueryResolver extends BaseListQuery {
  @Query(() => StaffListType, { name: 'staffList' })
  async resolve(@Args() args: BaseListArgs) {
    const items = await this.doListQuery(Staff, args)

    return this.formatResponse(items)
  }
}
