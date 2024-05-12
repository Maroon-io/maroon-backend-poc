import { defineChain } from 'viem'
import { type Chain } from "viem"



export const rollappx = {
  id: 2143307,
  name: "maroon_2143307-1",
  nativeCurrency: { name: "MRN", symbol: "MRN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-dev.maroon.io"],
    },
    public: {
      http: ["https://rpc-dev.maroon.io"],
    },
  },
  blockExplorers: {
    etherscan: { name: "RollApp X scan", url: "https://fl.dym.fyi/rollapp/maroon_2143307-1" },
    default: { name: "RollApp X scan", url: "https://fl.dym.fyi/rollapp/maroon_2143307-1" },
  },
} as const satisfies Chain