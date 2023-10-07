"use client";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

interface ProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

const Provider = ({children}: ProviderProps) => {

    return ( 
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
     );
}
 
export default Provider;