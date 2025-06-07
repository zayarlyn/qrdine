'use client'
import { Button, createTheme, MantineColorsTuple, MantineProvider as MtProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const brightRed: MantineColorsTuple = [
	'#ffe9f2',
	'#ffd1e0',
	'#faa1bd',
	'#f66e99',
	'#f2437a',
	'#f02866',
	'#f0185c',
	'#d6084c',
	'#c00043',
	'#a90039',
]

const theme = createTheme({
	colors: { brightRed },
	primaryColor: 'brightRed',
	fontFamily: 'var(--font-nunito)',
	components: {
		Button: Button.extend({
			styles: (theme) => ({
				root: {
					borderRadius: theme.radius.xs,
					fontWeight: 600,
					letterSpacing: '0.5px',
					whiteSpace: 'nowrap',
					flexShrink: 0,
				},
			}),
		}),
	},
})

export const MantineProvider = ({ children }: { children: any }) => {
	return <MtProvider theme={theme}>{children}</MtProvider>
}
