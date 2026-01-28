import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Menu, MenuType } from 'src/db/entities/MenuEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'

@ObjectType()
export class MenuListType extends PaginatedResponse(MenuType) {}

@Resolver(() => MenuType)
export class MenuListQueryResolver extends BaseListQuery {
  @Query(() => MenuListType, { name: 'menuList' })
  async resolve(@Args() args: BaseListArgs) {
    const items = await this.doListQuery(Menu, args)

    return this.formatResponse(items)
  }
}
