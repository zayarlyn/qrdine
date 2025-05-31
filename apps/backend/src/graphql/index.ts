import { type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { makeSchema } from 'nexus'
import { Menu } from './types.ts'
import { menuListQuery } from './menuListQuery.ts'

const types = [Menu]
const queries = [menuListQuery]

const graphQlPlugin = fp(async (app) => {
	app.register(mercurius, {
		schema: makeSchema({ types: [...types, ...queries] }),
		graphiql: true,
	})

	app.log.info('\x1b[34m[system] GraphQL plugin registered\x1b[0m')
})

export interface GraphQLContext {
	app: FastifyInstance
}

export default graphQlPlugin
