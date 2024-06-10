"use client"

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"

const QueryProvider = ({children}: PropsWithChildren) => {
    const queryCLientProvider= new QueryClient()
    return (
        <QueryClientProvider client={queryCLientProvider}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
