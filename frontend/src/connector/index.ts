import { http, createConfig } from 'wagmi'
import Web3AuthNoModalGoogleConnectorInstance from '../hooks/web3AuthNoModalGoogleConnectorInstance'
import { metaMask } from 'wagmi/connectors'
import { capsuleConnector } from "@usecapsule/wagmi-v2-integration";
import { capsule } from './capsule';
import { rollappx } from './rollappChain';

//@ts-ignore
export const config = createConfig({
  chains: [rollappx],
  connectors: [
    metaMask(),
    Web3AuthNoModalGoogleConnectorInstance([rollappx]),
    capsuleConnector({
      capsule,
      chains: [rollappx],
      options: {},
      appName: "Your App",
      disableModal: true,
    }),
  ],
  transports: {
    [rollappx.id]: http(),
  },
})