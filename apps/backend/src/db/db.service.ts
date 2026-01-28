import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, EntityManager, TypeORMError } from 'typeorm'

@Injectable()
export class DbService {
  constructor(private dataSource: DataSource) {}

  getDb() {
    return this.dataSource.createEntityManager()
  }

  async withTransaction(fn: (q: EntityManager) => any) {
    // const queryRunner = (await this.dbConnProvider.getDb()).createQueryRunner();
    const qr = this.dataSource.createQueryRunner()
    await qr.connect()
    await qr.startTransaction()

    try {
      const result = await fn(qr.manager)
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
