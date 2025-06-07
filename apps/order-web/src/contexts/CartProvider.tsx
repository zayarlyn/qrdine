'use client'
import { createContext, useContext, useState } from 'react'

interface CartCtx {
	orderItems: any[]
	addOrderItem: (oi: any) => void
}

const cartCtx = createContext({} as CartCtx)

export const useCart = () => useContext(cartCtx)

export const CartProvider = ({ children }: { children: any }) => {
	const [cart, setCart] = useState({ orderItems: [] } as any)
	const mergeCart = (obj: any) => setCart((prev: any) => ({ ...prev, ...obj }))

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

	return <cartCtx.Provider value={{ ...cart, addOrderItem }}>{children}</cartCtx.Provider>
}
