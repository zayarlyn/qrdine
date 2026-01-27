import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { DbService } from 'src/db/db.service'
import { Menu, MenuType } from 'src/db/entities/MenuEntity'
import { BaseListArgs, BaseListQuery, PaginatedResponse } from './BaseListQuery'

@ObjectType()
export class MenuListResType extends PaginatedResponse(MenuType) {}

@Resolver(() => MenuType)
export class MenuListQueryResolver extends BaseListQuery {
  constructor(private dbService: DbService) {
    super()
  }

  @Query(() => MenuListResType, { name: 'menuList' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resolve(@Args() args: BaseListArgs) {
    // const { where } = args

    const db = this.dbService.getDb()

    const items = await db.find(Menu, {})
    return { items, count: items.length }
  }
}
