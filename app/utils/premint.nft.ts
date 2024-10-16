import { createCreatorClient } from "@zoralabs/protocol-sdk";
import { useChainId, usePublicClient, useSignTypedData } from "wagmi";

const premintNft = async (creatorAccount:`0x${string}`,tokenURI:string) => {
    const chainId = useChainId();
    const publicClient = usePublicClient()!;

    const creatorClient = createCreatorClient({ chainId, publicClient });


    const {
        // the premint that is to be created
        premintConfig,
        // deterministic collection address of the premint
        collectionAddress,
        typedDataDefinition,
        submit,
    } = await creatorClient.createPremint({
        contract: {
            contractAdmin: creatorAccount,
            contractName: "Home Sale",
            contractURI:"ipfs://bafkreiainxen4b4wz4ubylvbhons6rembxdet4a262nf2lziclqvv7au3e",
        },
        // token info of token to create
        token: {
            tokenURI:tokenURI,
            payoutRecipient: creatorAccount,
        },
    });

    // sign the new premint, and submit it to the Zora Premint API
    const { signTypedData, data: signature } = useSignTypedData();

    signTypedData(typedDataDefinition);

    if (signature) {
        submit({
            signature,
        });
    }

    return (premintConfig.uid, collectionAddress)
}