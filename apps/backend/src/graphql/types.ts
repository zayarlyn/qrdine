import { objectType } from 'nexus'
import type { NexusObjectTypeDef, ObjectDefinitionBlock } from 'nexus/dist/core.js'

const dateTimeFields = (t: ObjectDefinitionBlock<any>) => {
	t.nonNull.string('createdAt', { resolve: (parent) => parent.createdAt.toISOString() })
	t.nonNull.string('updatedAt', { resolve: (parent) => parent.updatedAt.toISOString() })
	t.string('deletedAt', { resolve: (parent) => parent.deletedAt?.toISOString() })
}

export const MenuType = objectType({
	name: 'MenuType',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.nonNull.float('price')
		t.string('description')
		t.string('image')
		dateTimeFields(t)
	},
})

export const OrderType = objectType({
	name: 'OrderType',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.nonNull.string('staffId')
		t.string('seatId')
		t.float('paid')
		t.float('total')
		dateTimeFields(t)
		t.nonNull.list.nonNull.field('orderItems', { type: OrderItemType })
	},
})

export const OrderItemType = objectType({
	name: 'OrderItemType',
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

export const SeatType = objectType({
	name: 'SeatType',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		dateTimeFields(t)
	},
})

export const StaffType = objectType({
	name: 'StaffType',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		dateTimeFields(t)
	},
})

export const createQueryResultType = (type: NexusObjectTypeDef<any>, name: string) =>
	objectType({
		name: name + 'QueryResult',
		definition(t) {
			t.nonNull.list.nonNull.field('items', { type })
			t.nonNull.int('count')
		},
	})
