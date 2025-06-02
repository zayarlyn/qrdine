import fastify from 'fastify'

const buildApp = async () => {
	const app = fastify({
		logger: {
			transport: { target: 'pino-pretty', options: { colorize: true } },
		},
	})

	await app.register(import('./plugins/config.plugin.ts'))
	await app.register(import('./plugins/helper.plugin.ts'))
	await app.register(import('./db/index.ts'))
	await app.register(import('./graphql/index.ts'))

	try {
		await app.listen({ port: app.config.port })
	} catch (err) {
		app.log.error(err)
		// exit to prevent memory leak
		process.exit(0)
	}
}

buildApp()
