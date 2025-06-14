import { subscriptionField } from 'nexus'
import { type GraphQLContext } from '../index.ts'

const subscriptionName = 'orderSubscription'

export const orderSubscription = subscriptionField(subscriptionName, {
	type: 'String',
	subscribe(root, args, { pubsub }: GraphQLContext, info) {
		return pubsub.subscribe('order-updated')
	},
	resolve(payload) {
		console.log('orderSubscription payload:', payload)
		return typeof payload == 'string' ? payload : JSON.stringify(payload)
	},
})
