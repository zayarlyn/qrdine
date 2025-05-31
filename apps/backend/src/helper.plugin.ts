import fp from 'fastify-plugin'
import { monotonicFactory, type ULIDFactory } from 'ulid'

const helperPlugin = fp(async (app) => {
	const genUlid = monotonicFactory()

	app.decorate('helper', {
		genUlid,
	})

	app.log.info('\x1b[34m[system] Helper plugin registered\x1b[0m')
})

export default helperPlugin

declare module 'fastify' {
	interface FastifyInstance {
		helper: {
			genUlid: ULIDFactory
		}
	}
}
