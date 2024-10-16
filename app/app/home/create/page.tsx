"use client"
import {
    useAccount,
    useChainId,
    useConnect,
    usePublicClient,
    useSwitchChain,
    useWriteContract
} from 'wagmi';
import { createCreatorClient } from "@zoralabs/protocol-sdk";
import { useEffect, useState } from 'react';
import lighthouse, { upload } from '@lighthouse-web3/sdk'
import { IUploadProgressCallback } from '@lighthouse-web3/sdk/dist/types';
import { zoraSepolia } from 'viem/chains';

interface NFT {
    name: string,
    description: string
}

const CreateNft = () => {

    //Connectors
    const { isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { address } = useAccount();
    const { writeContract } = useWriteContract();

    //Form Field
    const [fileHash, setFileHash] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [nftMetadata, setNftMetadata] = useState<NFT>({name:"",description:""})

    //Wagmi
    const chainId = useChainId();
    const { chains, switchChain } = useSwitchChain()
    const publicClient = usePublicClient()!;
    const creatorClient = createCreatorClient({ chainId, publicClient });

    useEffect(() => {
        if (!isConnected) {
            const connector = connectors.filter((connecter) => connecter.id === "io.metamask")[0]
            connect({ connector })
            if(chainId != zoraSepolia.id){
                switchChain({chainId:zoraSepolia.id})
            }
        }
    }, [isConnected])

    const progressCallback = (progressData: IUploadProgressCallback) => {
        let percentageDone =
            100 - Number(progressData.progress.toFixed(2))
        console.log(percentageDone)
    }

    const uploadToIPFS = async (file: FileList | null) => {
        if (null)
            return
        const output = await lighthouse.upload(file, process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY!, undefined, progressCallback)
        console.log('File Status:', output)
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
        setFileHash(output.data.Hash)
    }

    const uploadMetadata = async ():Promise<string> => {
        const nftMetadataJson = JSON.stringify(nftMetadata);
        const output = await lighthouse.uploadText(nftMetadataJson, process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY!, "tokenmetadata")
        return output.data.Hash
    }

    const mintNFT = async () => {
        const nftMetadata = await uploadMetadata();
        const { parameters, contractAddress } = await creatorClient.create1155({
            contract: {
                name: "realestate",
                uri: `ipfs://${fileHash}`,
            },
            token: {
                tokenMetadataURI: `ipfs://${nftMetadata}/tokenmetadata.json`,
            },
            account: address!,
        });
        writeContract(parameters);
        setContractAddress(contractAddress)
    }

    return (
        <div className="bg-white mx-auto py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Create Your Proporty's NFT</h2>

                <div className="mx-auto max-w-lg rounded-lg border">
                    {contractAddress == "" ? <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div>
                            <label htmlFor="name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>
                            <input onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setNftMetadata((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                }))
                            } name="name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div>
                            <label htmlFor="description" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Description</label>
                            <input name="description" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input onChange={e => uploadToIPFS(e.target.files)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>


                        <button onClick={()=>mintNFT()} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Create</button>
                    </div>
                    : <div> <p className='text-black'>Your contract address is: </p> <a href={`https://sepolia.explorer.zora.energy/address/${contractAddress}`} className='text-black'>{contractAddress}</a> </div>
                }

                </div>
            </div>
        </div>
    )
}

export default CreateNft;