import { objectType } from 'nexus'
import { type ObjectDefinitionBlock } from 'nexus/dist/core.js'

const dateTimeFields = (t: ObjectDefinitionBlock<any>) => {
	t.nonNull.string('createdAt', { resolve: (parent) => parent.createdAt.toISOString() })
	t.nonNull.string('updatedAt', { resolve: (parent) => parent.updatedAt.toISOString() })
	t.string('deletedAt', { resolve: (parent) => parent.deletedAt?.toISOString() })
}

export const Menu = objectType({
	name: 'Menu',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.nonNull.float('price')
		t.string('description')
		t.string('image')
		dateTimeFields(t)
	},
})

export const Order = objectType({
	name: 'Order',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.nonNull.string('staffId')
		t.string('seatId')
		t.float('paid')
		t.float('total')
		dateTimeFields(t)
		t.nonNull.list.nonNull.field('orderItems', { type: OrderItem })
	},
})

export const OrderItem = objectType({
	name: 'OrderItem',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('menuId')
		t.nonNull.string('orderId')
		t.nonNull.float('menuPrice')
		t.nonNull.int('quantity')
		t.nonNull.string('status')
		dateTimeFields(t)
	},
})

export const Seat = objectType({
	name: 'Seat',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		dateTimeFields(t)
	},
})

export const Staff = objectType({
	name: 'Staff',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		dateTimeFields(t)
	},
})
