import fp from 'fastify-plugin'
import 'dotenv/config.js'
import { z } from 'zod/v4'

const configSchema = z
	.object({
		PORT: z.coerce.number(),
		DB_POSTGRES_USER: z.string(),
		DB_POSTGRES_PWD: z.string(),
		DB_POSTGRES_HOST: z.string(),
		DB_POSTGRES_PORT: z.coerce.number(),
		DB_POSTGRES_DB_NAME: z.string(),
	})
	.transform((data) => ({
		port: data.PORT,
		database: {
			user: data.DB_POSTGRES_USER,
			password: data.DB_POSTGRES_PWD,
			host: data.DB_POSTGRES_HOST,
			port: data.DB_POSTGRES_PORT,
			name: data.DB_POSTGRES_DB_NAME,
		},
	}))

export type Config = z.infer<typeof configSchema>

const configPlugin = fp(async (app, opts) => {
	const { data, error } = configSchema.safeParse(process.env)

	if (error) {
		app.log.error(z.treeifyError(error))
		throw new Error('Invalid env configuration')
	}

	app.decorate('config', data as Config)
})

export default configPlugin
