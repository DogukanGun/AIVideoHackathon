"use client"

import WagmiWrapper from "@/wagmi.wrapper";
import { HTMLProps } from "react";
import CustomNavbar from "./navbar";


const CustomLayout = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    return (
        <WagmiWrapper>
            <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <CustomNavbar />
                <main className="flex flex-col items-center justify-items-center gap-8 row-start-2 sm:items-start">
                    {children}
                </main>
            </div>
        </WagmiWrapper>
    )
}

export default CustomLayout;