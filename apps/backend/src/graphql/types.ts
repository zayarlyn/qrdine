import { objectType } from 'nexus'
import { type ObjectDefinitionBlock } from 'nexus/dist/core.js'

const dateTimeFields = (t: ObjectDefinitionBlock<any>) => {
	t.nonNull.string('createdAt', { resolve: (parent) => parent.created_at.toISOString() })
	t.nonNull.string('updatedAt', { resolve: (parent) => parent.updated_at.toISOString() })
	t.string('deletedAt', { resolve: (parent) => parent.deleted_at?.toISOString() })
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
		t.nonNull.string('staffId', { resolve: (parent) => parent.staff_id })
		t.string('seatId', { resolve: (parent) => parent.seat_id })
		t.float('paid')
		t.float('total')
		dateTimeFields(t)
	},
})

export const OrderItem = objectType({
	name: 'OrderItem',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('menuId', { resolve: (parent) => parent.menu_id })
		t.nonNull.string('orderId', { resolve: (parent) => parent.order_id })
		t.nonNull.float('menuPrice', { resolve: (parent) => parent.menu_price })
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
