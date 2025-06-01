import { type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { makeSchema } from 'nexus'
import { Menu, Order, OrderItem, Seat, Staff } from './types.ts'
import { menuListQuery } from './query/menuListQuery.ts'
import { mutateMenu } from './mutation/mutateMenu.ts'
import { JsonScalar } from './JsonScalar.ts'
import { mutateOrder } from './mutation/mutateOrder.ts'
import { orderListQuery } from './query/orderListQuery.ts'

const graphQlPlugin = fp(async (app) => {
	const types = [Menu, Order, OrderItem, Seat, Staff]
	const scalars = [JsonScalar]
	const queries = [menuListQuery, orderListQuery]
	const mutations = [mutateMenu, mutateOrder]

	app.register(mercurius, {
		schema: makeSchema({ types: [...types, ...scalars, ...queries, ...mutations] }),
		graphiql: true,
	})

	app.log.info('\x1b[34m[system] GraphQL plugin registered\x1b[0m')
})

export interface GraphQLContext {
	app: FastifyInstance
}

export default graphQlPlugin
