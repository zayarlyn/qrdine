// src/scalars/JsonScalar.ts
import { GraphQLScalarType, Kind } from 'graphql'

export const JsonScalar = new GraphQLScalarType({
	name: 'Json',
	description: 'Arbitrary JSON value',
	serialize(value) {
		return value // outgoing value from resolvers to client
	},
	parseValue(value) {
		return value // incoming value from client
	},
	parseLiteral(ast) {
		switch (ast.kind) {
			case Kind.STRING:
			case Kind.BOOLEAN:
				return ast.value
			case Kind.INT:
			case Kind.FLOAT:
				return parseFloat(ast.value)
			case Kind.OBJECT: {
				const value = Object.create(null)
				ast.fields.forEach((field) => {
					value[field.name.value] = this.parseLiteral(field.value)
				})
				return value
			}
			case Kind.LIST:
				return ast.values.map((val) => this.parseLiteral(val))
			default:
				return null
		}
	},
})
