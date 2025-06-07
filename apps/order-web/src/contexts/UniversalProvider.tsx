import { ApolloClientProvider } from './ApolloClientProvider'
import { CartProvider } from './CartProvider'
import { MantineProvider } from './MantineProvider'

export const UniversalProvider = ({ children }: { children: any }) => {
	return (
		<ApolloClientProvider>
			<MantineProvider>
				<CartProvider>{children}</CartProvider>
			</MantineProvider>
		</ApolloClientProvider>
	)
}
