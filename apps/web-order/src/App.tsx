import { useEffect, useMemo, useState } from 'react'
import { Cart } from './components/app/Cart'
import { FloatingCartButton } from './components/app/FloatingCartButton'
import { Header } from './components/app/Header'
import { MenuList } from './components/app/MenuList'
import { TableSelector } from './components/app/TableSelector'
import { useCartStore } from './lib/cart-store'

export function App() {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { setOrderId } = useCartStore()

	// Check URL params on mount
	const urlOrderId = useMemo(() => {
		const params = new URLSearchParams(window.location.search)
		// return params.get('seat') || params.get('table')
		return params.get('orderId')
	}, [])

	useEffect(() => {
		if (urlOrderId) {
			setOrderId(urlOrderId)
		}
	}, [urlOrderId, setOrderId])

	// Show table selector if no seat is set (and not from URL)
	const showTableSelector = !urlOrderId

	if (showTableSelector) {
		return <TableSelector />
	}

	return (
		<div className='min-h-screen bg-background'>
			<Header onCartClick={() => setIsCartOpen(true)} />

			<main className='container mx-auto px-4 py-6'>
				<MenuList />
			</main>

			<FloatingCartButton onClick={() => setIsCartOpen(true)} />

			<Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</div>
	)
}

export default App
