import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class DbService {
  constructor(private ds: DataSource) {}

  getDb() {
    return this.ds.createEntityManager()
  }
}
