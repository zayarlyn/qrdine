'use client'
import { useMutation, useQuery } from '@apollo/client'
import { gql } from '@me/graphql/__generated__'
import { MenuType, OrderItemType, OrderType } from '@me/graphql/__generated__/graphql'
import { useParams } from 'next/navigation'
import { createContext, useContext, useState } from 'react'

const mutateOrderGql = gql(`
	mutation mutateOrder($values: Json!, $id: ID) {
		mutateOrder(values: $values, id: $id) {
			id
		}
	}
`)

const mutateOrderItemGroupGql = gql(`
	mutation mutateOrderItemGroup($values: Json!) {
		mutateOrderItemGroup(values: $values) {
			id
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

const orderListGql = gql(`
	query orderList_cart($where: Json!) {
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
					groupId
					menuPrice
					quantity
					orderId
				}
			}
		}
	}
`)

interface CartCtx {
	order: OrderType
	orderItems: OrderItemType[]
	menus: MenuType[]
	addOrderItem: (oi: any) => void
	placeOrder: () => Promise<any>
}

const cartCtx = createContext({} as CartCtx)

export const useCart = () => useContext(cartCtx)

export const CartProvider = ({ children }: { children: any }) => {
	const { data: menuData } = useQuery(menuListGql, { variables: { where: {} } })
	const [cart, setCart] = useState({ orderItems: [] } as any)
	const { orderId } = useParams()
	const { data } = useQuery(orderListGql, { variables: { where: { id: orderId } } })
	const order = data?.orderList?.items?.[0]
	const mergeCart = (obj: any) => setCart((prev: any) => ({ ...prev, ...obj }))

	// const [mutateOrder] = useMutation(mutateOrderGql, { refetchQueries: ['orderList'] })
	const [mutateOrderItemGroup] = useMutation(mutateOrderItemGroupGql, { refetchQueries: [orderListGql] })

	const addOrderItem = (oi: any) => {
		setCart((prev: any) => {
			const orderItems = structuredClone(prev.orderItems)
			const existingMenuOrderItemIdx = orderItems.findIndex((item: any) => item.menuId === oi.menuId)
			if (existingMenuOrderItemIdx !== -1) {
				orderItems[existingMenuOrderItemIdx].quantity += oi.quantity
			} else {
				orderItems.push(oi)
			}
			return { ...prev, orderItems }
		})
	}

	const placeOrder = async () => {
		return mutateOrderItemGroup({ variables: { values: { orderId: order?.id, orderItems: cart.orderItems } } }).then(
			() => setCart((prev: any) => ({ ...prev, orderItems: [] }))
		)
	}

	return (
		<cartCtx.Provider value={{ ...cart, menus: menuData?.menuList.items, order, addOrderItem, placeOrder }}>
			{children}
		</cartCtx.Provider>
	)
}
