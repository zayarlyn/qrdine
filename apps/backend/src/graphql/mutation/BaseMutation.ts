import { Inject } from '@nestjs/common'
import { ArgsType, Field, ID } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import _ from 'lodash'
import { DbService } from '../../db/db.service'
// import { GqlValidationEx } from 'src/common/exceptions';
import { EntityManager, EntityTarget, FindOneOptions } from 'typeorm'

@ArgsType()
export class BaseMutArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => GraphQLJSON)
  values: any
}

export abstract class BaseMutation {
  @Inject(DbService)
  protected dbService: DbService
  // constructor(public dbService: DbService) {}
  // validate<T>(object: any, schema: z.ZodType): T {
  //   const result = schema.safeParse(object);
  //   if (result.error) {
  //     throw new GqlValidationEx(result.error.issues);
  //   }
  //   return result.data as T;
  // }

  async findOneOrCreate<T>(db: EntityManager, entity: EntityTarget<any>, options: FindOneOptions): Promise<T> {
    const where = options.where as Record<string, any>
    return where.id ? await db.findOneOrFail(entity, options) : db.create(entity)
  }

  async doMutate(entity: EntityTarget<any>, args: BaseMutArgs, db: EntityManager) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')
    const menu = id ? await db.findOneByOrFail(entity, { id }) : db.create(entity)

    if (deletedAt) {
      await menu.softRemove()
    } else {
      menu.fill(values)

      await menu.save()
    }

    return menu
  }
}
