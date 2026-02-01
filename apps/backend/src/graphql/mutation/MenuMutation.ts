// import { GqlValidationEx } from 'src/common/exceptions';

import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Menu, MenuType } from '../../db/entities/MenuEntity'
import { BaseMutArgs, BaseMutation } from './BaseMutation'

@Resolver(() => MenuType)
export class MenuMutationResolver extends BaseMutation {
  // @Inject(DbService)
  // private

  @Mutation(() => MenuType, { name: 'menuMutation' })
  resolve(@Args() args: BaseMutArgs) {
    return this.dbService.withTransaction(async (db) => {
      return this.doMutate(Menu, args, db)
    })
  }
}
