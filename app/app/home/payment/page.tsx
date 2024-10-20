"use client"
import { useAccount, useReadContract } from "wagmi";
import marketplaceAbi from "../../../marketplace.abi.json"
import tradeAbi from "../../../trade.abi.json"
import { useMemo, useState } from "react";

const Payment = () => {

    const [isOwner,setIsOwner] = useState<boolean | undefined>(undefined)

    const smartContractAddress = useMemo(()=>{
        const { address } = useAccount();
        const { data } = useReadContract({
            address:"0x20Ec7c1888D3B77eeccF580b33e51b5a412F1b40",
            abi:marketplaceAbi,
            functionName: 'activeTrades',
            args: [address],
        })
        return data as string
    },[])

    const checkOwnership = () => {
        const { data } = useReadContract({
            address:smartContractAddress as `0x${string}`,
            abi:tradeAbi,
            functionName: 'checkOwner',
            args: [],
        })
        setIsOwner(data as boolean)
    }
    
    return (
        <div className="bg-white mx-auto py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Make Your Payment</h2>
                <div>
                    <h4 className="text-black">Your Trade Smart Contract Address : <p className="text-black">{smartContractAddress as string}</p></h4>
                </div>
                <button onClick={checkOwnership} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Create</button>
                {isOwner === true && <p>You are the owner</p>}
                {isOwner === false && <p>You are not the owner</p>}
            </div>
        </div>
    )
}

export default Payment;