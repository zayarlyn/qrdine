'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
})

export const ApolloClientProvider = ({ children }: { children: any }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
