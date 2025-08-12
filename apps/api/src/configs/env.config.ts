import { config } from 'dotenv'
import path from 'path'
import { cwd } from 'process'
import { z } from 'zod/v4'

config({ path: path.join(cwd(), '../../.env') }) // Load environment variables from .env file

const configSchema = z
	.object({
		API_PORT: z.coerce.number(),
		DB_POSTGRES_USER: z.string(),
		DB_POSTGRES_PWD: z.string(),
		DB_POSTGRES_HOST: z.string(),
		DB_POSTGRES_PORT: z.coerce.number(),
		DB_POSTGRES_DB_NAME: z.string(),
	})
	.transform((data) => ({
		port: data.API_PORT,
		database: {
			user: data.DB_POSTGRES_USER,
			password: data.DB_POSTGRES_PWD,
			host: data.DB_POSTGRES_HOST,
			port: data.DB_POSTGRES_PORT,
			name: data.DB_POSTGRES_DB_NAME,
		},
	}))

export type Config = z.infer<typeof configSchema>

export const getEnv = () => {
	const result = configSchema.safeParse(process.env)
	return [result.data, result] as [Config, typeof result]
}
