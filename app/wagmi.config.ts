import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, zora, zoraSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [zoraSepolia,zora],
  transports: {
    [zoraSepolia.id]: http(),
    [zora.id]: http(),
  },
})