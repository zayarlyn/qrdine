import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DbService } from '../db/db.service'
import { MenuMutationResolver } from './mutation/MenuMutation'
import { MenuListQueryResolver } from './query/MenuListQuery'
import { OrderListQueryResolver } from './query/OrderListQuery'
import { SeatListQueryResolver } from './query/SeatListQuery'
import { CheckoutMutationResolver } from './mutation/CheckoutMutation'
import { StaffListQueryResolver } from './query/StaffListQuery'

@Module({
  providers: [
    MenuListQueryResolver,
    OrderListQueryResolver,
    StaffListQueryResolver,
    SeatListQueryResolver,
    MenuMutationResolver,
    CheckoutMutationResolver,
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
