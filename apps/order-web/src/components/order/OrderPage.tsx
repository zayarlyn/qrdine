'use client'

import { useQuery } from '@apollo/client'
import { ActionIcon, Badge, Button, Card, Divider, Drawer, Grid, Group, Image, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCart } from '@me/contexts/CartProvider'
import { gql } from '@me/graphql/__generated__'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

export const QtyInput = ({ value, onChange }: { value: number; onChange: any }) => {
	return (
		<TextInput
			value={value}
			onChange={() => {}}
			styles={{ input: { textAlign: 'center' }, wrapper: {} }}
			leftSection={
				<ActionIcon onClick={() => onChange((v: number) => Math.max(0, v - 1))} variant='subtle' size='lg'>
					<Minus />
				</ActionIcon>
			}
			rightSection={
				<ActionIcon onClick={() => onChange((v: number) => v + 1)} variant='subtle' size='lg'>
					<Plus />
				</ActionIcon>
			}
		/>
	)
}

const menuListGql = gql(`
	query menuListQuery($where: Json!) {
		menuList(where: $where) {
			items {
				id
				name
				price
				description
				createdAt
				updatedAt
				deletedAt
			}
			count
		}
	}
`)

export const MenuItem = ({ menu }: { menu: any }) => {
	const { orderItems, addOrderItem } = useCart()
	const [qty, setQty] = useState(1)

	return (
		<Card style={{ height: '100%' }}>
			<Card.Section>
				<Image src={`https://picsum.photos/400/300`} alt='Norway' style={{ height: 150, objectFit: 'cover' }} />
			</Card.Section>
			<Card.Section
				style={{
					paddingBlock: 4,
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					gap: 16,
				}}
			>
				<Group gap={0} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
					<Text>{menu.name}</Text>
					<Text size='lg' style={{ fontWeight: 700 }}>
						{menu.price} Ks
					</Text>
				</Group>
				<Group style={{ flexWrap: 'nowrap' }}>
					<QtyInput value={qty} onChange={setQty} />
					<Button onClick={() => addOrderItem({ menuId: menu.id, quantity: qty })}>Add</Button>
				</Group>
			</Card.Section>
		</Card>
	)
}

export const OrderPage = () => {
	const { data } = useQuery(menuListGql, { variables: { where: {} } })
	const { items, count } = data?.menuList || {}
	const { orderItems, addOrderItem } = useCart()

	const [opened, { open, close }] = useDisclosure(false)

	return (
		<div>
			<div className='p-2 px-4 flex items-center justify-between'>
				Shipper
				<ActionIcon onClick={open} c='black' size='lg' variant='subtle'>
					<ShoppingBag />
					<Badge
						className='absolute right-0 bottom-0'
						styles={{ root: { cursor: 'pointer' }, label: { overflow: 'visible' } }}
						size='sm'
						circle
					>
						{orderItems.reduce((acc, oi) => acc + oi.quantity, 0)}
					</Badge>
				</ActionIcon>
			</div>
			<Divider />
			<div className='p-4'>
				<Grid gutter={24}>
					{items?.map((menu) => {
						return (
							<Grid.Col span={6} key={menu.id}>
								<MenuItem menu={menu} />
							</Grid.Col>
						)
					})}
				</Grid>
			</div>
			<Drawer
				opened={opened}
				onClose={close}
				title='Order Details'
				size='sm'
				position='right'
				styles={{
					body: { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' },
					content: { display: 'flex', flexDirection: 'column' },
				}}
			>
				{/* Drawer content */}
				<div className='grow overflow-auto'>
					{orderItems.map((oi) => {
						const menu = items?.find((m) => m.id === oi.menuId)
						return (
							<Group key={oi.menuId} wrap='nowrap' justify='space-between' align='flex-start' mb={12}>
								<Image
									src={`https://picsum.photos/400/300`}
									alt='Norway'
									style={{ width: 50, aspectRatio: 1, objectFit: 'cover' }}
								/>
								<Group gap={8} style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
									<Text lineClamp={1}>{menu?.name}</Text>
									{/* <Group> */}
									<Text size='sm' style={{ whiteSpace: 'nowrap', fontWeight: 700 }}>
										Qty: {oi.quantity}
									</Text>
								</Group>
								{/* </Group> */}
							</Group>
						)
					})}
				</div>
				<Button size='md' styles={{ root: { width: '100%' } }} mt={16} onClick={close}>
					Place order
				</Button>
			</Drawer>
		</div>
	)
}
