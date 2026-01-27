import { Module } from '@nestjs/common'
import { DbModule } from './db/db.module'
import { ConfigModule } from '@nestjs/config'
import { loadAppConfig } from './config/app.config'
import { loadDbConfig } from './config/db.config'
import { MyGraphQLModule } from './graphql/graphql.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadAppConfig, loadDbConfig],
    }),
    DbModule,
    MyGraphQLModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
