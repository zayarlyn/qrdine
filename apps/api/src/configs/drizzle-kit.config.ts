import { defineConfig } from 'drizzle-kit'
import { getEnv } from './env.config'

const getPostgresUrl = () => {
	const [config] = getEnv()
	const { host, name, password, port, user } = config!.database
	return `postgresql://${user}:${password}@${host}:${port}/${name}`
}
console.log(getPostgresUrl())

export default defineConfig({
	schema: './src/db/drizzle-schema.ts', // require base path
	// out: "./drizzle",
	dialect: 'postgresql',
	dbCredentials: {
		url: getPostgresUrl(),
	},
})
