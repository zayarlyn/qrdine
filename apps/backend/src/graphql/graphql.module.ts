import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MenuListQueryResolver } from './query/MenuListQuery'
import { DbService } from 'src/db/db.service'
import { OrderListQueryResolver } from './query/OrderListQuery'
import { SeatListQueryResolver } from './query/SeatListQuery'
import { MutateMenuResolver } from './mutation/MutateMenu'
// import { StaffListQueryResolver } from './query/StaffListQuery'

@Module({
  providers: [
    MenuListQueryResolver,
    OrderListQueryResolver,
    // StaffListQueryResolver,
    SeatListQueryResolver,
    MutateMenuResolver,
    DbService,
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class MyGraphQLModule {}
