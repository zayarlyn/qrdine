import fp from 'fastify-plugin'
import { type Config, getEnv } from '../configs/env.config.ts'
import { z } from 'zod/v4'

const configPlugin = fp(async (app, opts) => {
	const [, { data, error }] = getEnv()

	if (error) {
		app.log.error(z.treeifyError(error))
		throw new Error('Invalid env configuration')
	}

	app.decorate('config', data as Config)
})

export default configPlugin
