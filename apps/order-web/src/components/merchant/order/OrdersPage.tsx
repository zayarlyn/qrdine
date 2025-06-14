'use client'
import { useQuery, useSubscription } from '@apollo/client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button, Card, Group, Text } from '@mantine/core'
import { OrderItemGroup } from '@me/components/order/OrderPage'
import { gql } from '@me/graphql/__generated__'
import { OrderItemGroupType } from '@me/graphql/__generated__/graphql'

const orderListGql = gql(`
	query orderList($where: Json!) {
		orderList(where: $where) {
			items {
				id
				name
				total
				orderItemGroups {
					id
					status
					orderItems {
						id
						menuId
						groupId
						menuPrice
						quantity
						orderId
					}
				}
				orderItems {
					id
					menuId
					menuPrice
					quantity
					orderId
				}
			}
		}
	}
`)

const orderItemGroupListGql = gql(`
	query orderItemGroupList($where: Json!) {
		orderItemGroupList(where: $where) {
			items {
				id
				status
				orderId
				order {
					id
					seat {
						id
						name
					}
				}
				orderItems {
					id
					menuId
					menuPrice
					quantity
					orderId
				}
			}
		}
	}
`)

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

const orderSubGql = gql(`
	subscription orderSub{
		orderSubscription
	}
`)

export const OrdersPage = () => {
	const { data, loading } = useQuery(orderItemGroupListGql, { variables: { where: {} }, pollInterval: 5000 })
	// const { data, loading } = useQuery(orderListGql, { variables: { where: {} }, pollInterval: 5000 })
	const { items: orderItemGroups = [] } = data?.orderItemGroupList || {}
	const { data: menuResponse } = useQuery(menuListGql, { variables: { where: {} } })
	const { items: menus } = menuResponse?.menuList || {}
	const { data: subData } = useSubscription(orderSubGql, {})
	console.log(subData)
	const [parent] = useAutoAnimate()

	if (loading) return null

	return (
		<div className='flex flex-col overflow-hidden h-screen'>
			<div className='p-4 pb-16 overflow-auto'>
				<Text size='xl' style={{ fontWeight: 700 }}>
					Orders
				</Text>
				{JSON.stringify(subData || '')}
				<div className='mt-4'>
					{/* {orders?.map((order) => {
						return ( */}
					{/* <div key={order.id} className='mb-4'> */}
					<div className='flex justify-between'>
						{/* <div>
							<Text size='lg'>#{order.id}</Text>
							<Text size='md' c='dimmed'>
								Total: ${order.orderItems.reduce((acc, oi) => acc + oi.menuPrice * oi.quantity, 0)}
							</Text>
						</div> */}
					</div>
					<div ref={parent}>
						{orderItemGroups.map((oig) => (
							<div key={oig.id} className='mb-8'>
								<Text style={{ fontWeight: 700 }}>{oig.order.seat.name}</Text>
								<OrderItemGroup orderItemGroup={oig as OrderItemGroupType} />
								<div className='gap-2 flex'>
									<Button color='gray'>Decline</Button>
									<Button>Accept</Button>
								</div>
							</div>
						))}
					</div>
					{/* </div> */}
					{/* )
					})} */}
				</div>
			</div>
		</div>
	)
}
