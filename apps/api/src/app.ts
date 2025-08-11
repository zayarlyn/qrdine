import fastify from 'fastify'
import cors from '@fastify/cors'
import { type Config } from './plugins/config.plugin.ts'

const buildApp = async () => {
	const app = fastify({
		logger: {
			transport: { target: 'pino-pretty', options: { colorize: true } },
		},
	})

	await app.register(cors, {})

	await app.register(import('./plugins/config.plugin.ts'))
	// await app.register(import('./plugins/helper.plugin.ts'))
	// await app.register(import('./db/index.ts'))
	// await app.register(import('./graphql/index.ts'))

	app.get('/', async (request, reply) => {
		return { message: 'Hello, World!' }
	})

	try {
		console.log('mojo')
		await app.listen({ port: app.config.port, host: '0.0.0.0' })
	} catch (err) {
		app.log.error(err)
		// exit to prevent memory leak
		process.exit(0)
	}
}

buildApp()

declare module 'fastify' {
	interface FastifyInstance {
		config: Config
	}
}
