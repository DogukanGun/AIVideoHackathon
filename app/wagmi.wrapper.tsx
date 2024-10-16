"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "./wagmi.config";
import { HTMLProps } from "react";

const queryClient = new QueryClient()

const WagmiWrapper = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    return (<WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
                {children}
        </QueryClientProvider>
    </WagmiProvider>)
}

export default WagmiWrapper;