import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}

export class BaseListQuery {
  constructor() {}
}

export function PaginatedResponse<TEntity>(classRef: TEntity) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseType {
    @Field(() => [classRef])
    items: TEntity[]

    @Field(() => Number)
    count: number
  }

  return PaginatedResponseType
}
