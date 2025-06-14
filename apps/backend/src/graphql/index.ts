import { type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius, { type PubSub } from 'mercurius'
import { makeSchema } from 'nexus'
import { JsonScalar } from './JsonScalar.ts'
import { mutateMenu } from './mutation/mutateMenu.ts'
import { mutateOrder } from './mutation/mutateOrder.ts'
import { menuListQuery } from './query/menuListQuery.ts'
import { orderListQuery } from './query/orderListQuery.ts'
import { orderSubscription } from './subscription/OrderSub.ts'
import { MenuType, OrderItemType, OrderType, SeatType, StaffType } from './types.ts'
import { mutateOrderItemGroup } from './mutation/mutateOrderItemGroup.ts'
import { orderItemGroupListQuery } from './query/orderItemGroupListQuery.ts'

const graphQlPlugin = fp(async (app) => {
	const types = [MenuType, OrderType, OrderItemType, SeatType, StaffType]
	const scalars = [JsonScalar]
	const queries = [menuListQuery, orderListQuery, orderItemGroupListQuery]
	const mutations = [mutateMenu, mutateOrder, mutateOrderItemGroup]
	const subscriptions = [orderSubscription]

	app.register(mercurius, {
		schema: makeSchema({ types: [...types, ...scalars, ...queries, ...mutations, ...subscriptions] }),
		graphiql: true,
		subscription: true,
	})

	app.log.info('\x1b[34m[system] GraphQL plugin registered\x1b[0m')
})

export interface GraphQLContext {
	app: FastifyInstance
	pubsub: PubSub
}

export default graphQlPlugin
