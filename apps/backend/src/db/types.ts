import { relations } from 'drizzle-orm'
import { boolean, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const menuTable = pgTable('menu', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	price: numeric('price').notNull(),
	available: boolean('available').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

// export const menuRelations = relations(menuTable, ({ many }) => ({
//   orderItems: many(orderItemTable)
// }))

export const orderTable = pgTable('order', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	staffId: text('staff_id'),
	seatId: text('seat_id').notNull(),
	total: numeric('total'),
	paid: numeric('paid'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

export const orderRelations = relations(orderTable, ({ one, many }) => ({
	staff: one(staffTable, {
		fields: [orderTable.staffId],
		references: [staffTable.id],
	}),
	seat: one(seatTable, {
		fields: [orderTable.seatId],
		references: [seatTable.id],
	}),
	orderItems: many(orderItemTable),
	orderItemGroups: many(orderItemGroupTable),
}))

export const orderItemTable = pgTable('order_item', {
	id: text('id').primaryKey(),
	orderId: text('order_id')
		.notNull()
		.references(() => orderTable.id),
	menuId: text('menu_id')
		.notNull()
		.references(() => menuTable.id),
	menuPrice: numeric('menu_price').notNull(),
	quantity: integer('quantity').notNull(),
	groupId: text('group_id')
		.notNull()
		.references(() => orderItemGroupTable.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
	order: one(orderTable, {
		fields: [orderItemTable.orderId],
		references: [orderTable.id],
	}),
	menu: one(menuTable, {
		fields: [orderItemTable.menuId],
		references: [menuTable.id],
	}),
	orderItemGroup: one(orderItemGroupTable, {
		fields: [orderItemTable.groupId],
		references: [orderItemGroupTable.id],
	}),
}))

export const seatTable = pgTable('seat', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

export const seatRelations = relations(seatTable, ({ many }) => ({
	orders: many(orderTable),
}))

export const staffTable = pgTable('staff', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

export const staffRelations = relations(staffTable, ({ many }) => ({
	orders: many(orderTable),
}))

export const orderItemGroupTable = pgTable('order_item_group', {
	id: text('id').primaryKey(),
	status: text('status').notNull(),
	orderId: text('order_id')
		.notNull()
		.references(() => orderTable.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	deletedAt: timestamp('deleted_at'),
})

export const orderItemGroupRelations = relations(orderItemGroupTable, ({ one, many }) => ({
	order: one(orderTable, {
		fields: [orderItemGroupTable.orderId],
		references: [orderTable.id],
	}),
	orderItems: many(orderItemTable),
}))
