// import { GqlValidationEx } from 'src/common/exceptions';

import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Menu, MenuType } from 'src/db/entities/MenuEntity'
import { BaseMutArgs, BaseMutate } from './BaseMutate'
import { DbService } from 'src/db/db.service'

@Resolver(() => MenuType)
export class MutateMenuResolver extends BaseMutate {
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => MenuType, { name: 'menuMutation' })
  resolve(@Args() args: BaseMutArgs) {
    return this.dbService.withTransaction(async (db) => {
      return this.doMutate(Menu, args, db)
    })
  }
}
