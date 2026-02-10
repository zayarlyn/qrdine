import { Inject } from '@nestjs/common'
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { FindManyOptions, ObjectLiteral, type EntityTarget } from 'typeorm'
import { DbService } from '../../db/db.service'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}
export class BaseListQuery {
  // constructor(protected dbs: DbService) {}
  @Inject(DbService)
  public dbService: DbService

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async doListQuery<E extends ObjectLiteral>(entity: EntityTarget<E>, args: BaseListArgs, options: FindManyOptions<E> = {}) {
    if (args.where?.id === null) return []
    // const { where } = args
    const db = this.dbService.getDb()

    const items = await db.find<E>(entity, { ...options, where: args.where })
    return items
  }

  formatResponse(items) {
    return { items, count: items.length }
  }
}

export function PaginatedResponse<TEntity>(entity: TEntity) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseType {
    @Field(() => [entity])
    items: TEntity[]

    @Field(() => Int)
    count: number
  }

  return PaginatedResponseType
}
