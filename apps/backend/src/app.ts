import fastify from 'fastify'

const buildApp = async () => {
	const app = fastify({
		logger: {
			transport: { target: 'pino-pretty', options: { colorize: true } },
		},
	})

	app.register(import('./helper.plugin.ts'))
	app.register(import('./db/index.ts'))
	app.register(import('./graphql/index.ts'))

	try {
		await app.listen({ port: 5000 })
	} catch (err) {
		app.log.error(err)
		// exit to prevent memory leak
		process.exit(0)
	}
}

buildApp()
