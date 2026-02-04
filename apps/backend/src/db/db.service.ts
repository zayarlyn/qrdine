import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, EntityManager, EntityTarget, FindOneOptions, ObjectLiteral, TypeORMError } from 'typeorm'

function extendManager(manager: EntityManager): ExtendedEntityManager {
  const m = manager as ExtendedEntityManager

  m.build = m.create.bind(m)

  // m.bulkBuild = function (entity, items) {
  //   const drafts = items.map((item) => m.build(entity, item))
  //   return drafts
  // }

  m.findOneByIdOrCreate = async function (entity, id, options) {
    const item = id ? await m.findOne(entity, { ...options, where: { id } as any }) : m.build(entity)

    if (!item) throw new Error('Entity not found')

    return item
  }

  return m
}

@Injectable()
export class DbService {
  constructor(private dataSource: DataSource) {}

  getDb() {
    return this.dataSource.createEntityManager()
  }

  async withTransaction(fn: (q: ExtendedEntityManager) => any) {
    // const queryRunner = (await this.dbConnProvider.getDb()).createQueryRunner();
    const qr = this.dataSource.createQueryRunner()
    await qr.connect()
    await qr.startTransaction()

    try {
      const result = await fn(extendManager(qr.manager))
      await qr.commitTransaction()
      return result
    } catch (err: any) {
      await qr.rollbackTransaction()
      // Wrap database errors appropriately
      if (err instanceof TypeORMError) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }

      // Default to bad request for unknown errors
      throw new HttpException(err.message || err, HttpStatus.BAD_REQUEST)
    } finally {
      await qr.release()
    }
  }
}

// type TBulkBuild = <Entity, EntityLike extends DeepPartial<Entity>>(entityClass: EntityTarget<Entity>, plainObject: EntityLike[]) => Entity[]

type TFindOneOrCreate = <Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  id?: string,
  options?: FindOneOptions<Entity>,
) => Promise<Entity>

export type ExtendedEntityManager = EntityManager & {
  build: typeof EntityManager.prototype.create
  // bulkBuild: TBulkBuild
  findOneByIdOrCreate: TFindOneOrCreate
}
