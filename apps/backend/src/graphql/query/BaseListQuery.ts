import { Inject } from '@nestjs/common'
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { DbService } from 'src/db/db.service'
import { type EntityTarget } from 'typeorm'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}
export class BaseListQuery {
  // constructor(protected dbs: DbService) {}
  @Inject(DbService)
  private dbService: DbService

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async doListQuery(entity: EntityTarget<any>, args: BaseListArgs) {
    // const { where } = args
    console.log(this)
    const db = this.dbService.getDb()

    const items = await db.find(entity, {})
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
