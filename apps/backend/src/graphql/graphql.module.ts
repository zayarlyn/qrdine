import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MenuListQueryResolver } from './query/MenuListQuery'
import { DbService } from 'src/db/db.service'

@Module({
  providers: [
    MenuListQueryResolver,
    // OrderListQueryResolver, MenuMutationResolver, OrderMutationResolver
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
