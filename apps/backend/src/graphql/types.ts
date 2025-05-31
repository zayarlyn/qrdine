import { objectType } from 'nexus'

export const Menu = objectType({
	name: 'Menu',
	definition(t) {
		t.nonNull.string('id')
		t.nonNull.string('name')
		t.nonNull.float('price')
		t.string('description')
		t.string('image')
	},
})
