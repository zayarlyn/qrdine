import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { UniversalProvider } from '@me/contexts/UniversalProvider'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' {...mantineHtmlProps} className={`${nunito.variable} antialiased`}>
			<head>
				<ColorSchemeScript />
			</head>
			<body className=''>
				<UniversalProvider>{children}</UniversalProvider>
			</body>
		</html>
	)
}
