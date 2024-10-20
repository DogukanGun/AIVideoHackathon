"use client"

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import marketplaceAbi from "../../../marketplace.abi.json"

interface Trade {
    buyerWalletAddress: string;
    paymentAmount: Number
}

const Marketplace = () => {

    const [tradeData, setTradeData] = useState<Trade>({ buyerWalletAddress: "", paymentAmount: 0 })
    const { writeContract } = useWriteContract();
    const { address } = useAccount();


    const startTrade = () => {
        //marketplace contract 0xb80e1f79F6964cc1D9562C9Fd8a469A0B09189a1
        //0x20Ec7c1888D3B77eeccF580b33e51b5a412F1b40
        writeContract({
            address:"0x20Ec7c1888D3B77eeccF580b33e51b5a412F1b40",
            abi:marketplaceAbi,
            functionName:"startTrade",
            args:[
                address,
                tradeData.buyerWalletAddress,
                tradeData.paymentAmount
            ]
        })
    }

    return (
        <div className="bg-white mx-auto py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Start Your Trade</h2>
                <div>
                    <label htmlFor="bWallet" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Buyer Wallet Address</label>
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTradeData((prev) => ({
                            ...prev,
                            buyerWalletAddress: event.target.value,
                        }))
                    } name="bWallet" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                </div>
                <div>
                    <label htmlFor="pAmount" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Payment Amount</label>
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTradeData((prev) => ({
                            ...prev,
                            paymentAmount: Number(event.target.value),
                        }))
                    } name="pAmount" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                </div>
                <button onClick={startTrade} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Create</button>

            </div>
        </div>
    )
}

export default Marketplace;