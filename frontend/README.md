# Maroon

## Overview

Maroon represents the evolution of hybrid digital asset exchanges, prioritizing your ownership without any compromise. Our platform integrates self-custodial smart wallets, ensuring you maintain absolute control over your funds, with keys securely in your possession. With seamless authentication via your preferred social login, bid farewell to the hassle of managing private keys or seed phrases. Utilizing a multi-signature architecture, every transaction, be it withdrawals or order placements, requires a 2-of-2 signing solution, empowering users to govern their transactions.


## Technology Stack

- [Next.js](https://nextjs.org/)
- [Nest.js](https://nestjs.com/)
- [PostgreSQL](https://postgresql.org/)
- [Dymension](https://dymension.xyz/)
- [Capsule](https://usecapsule.com/)

## Core Components, Protocols, and Architecture

Maroon's architecture revolves around empowering users while ensuring seamless transactions. Through the Capsule wallet integration, utilizing Create2, we predict a secure address, constituting a 2-of-2 multisignature, blending the user's Capsule wallet address with our platform's. Users fund this safe address with tokens for trading. When placing orders, users sign three transactions which are also co-signed by our platform: safe deployment, token allowance for the 0x contract, and the order itself, including the RegisterAllowedSignature transaction authorizing Maroon to sign orders on their behalf. Orders sent to the Matching Engine undergo bundling if matching occurs, consolidated into a single transaction sent to the Entry Point contract for processing.

![Architecture Diagram](https://res.cloudinary.com/ddo5l4trk/image/upload/v1715441120/Untitled_Diagram.drawio_sey3od.png)

_Architecture Diagram of Core Components_

### Maker/Taker

The user-controlled wallet (Maker/Taker) acts as Key 1 for signing trade orders before submission.

### Maroon

Maroon's wallet (Platform) co-signs all transactions initiated by the Maker/Taker, ensuring security and integrity.

### JS Matching Engine

Responsible for matching and storing orders in the order book, the engine adeptly handles partial and full order matching.

### Entry Point Smart Contract

Transactions are sent here for bundling before further processing, streamlining the transaction flow.

### Token Contract

The token smart contract facilitates trades and manages allowance permissions, ensuring smooth on-chain operations.

### Safe Contract

With a 2-signer threshold, the Safe Contract requires both Maroon and users' signatures, housing the tokens for trading securely.

### 0x Contract

This smart contract handles on-chain order settlements, ensuring transparency and efficiency in trade execution.

## Demo

### Live Demo Instructions

- Navigate to https://demo.maroon.io/ and connect your wallet!
- Click on the deposit section and fund your wallet with the trade tokens
- Buy or Sell the tokens

![Video Diagram](https://res.cloudinary.com/ddo5l4trk/video/upload/v1715441272/final_combine_final_last_-_Made_with_Clipchamp_nttabp.mp4)

## Other Component Repositories

- https://github.com/Maroon-io/maroon-backend-poc


## rollApp information

Follow the instructions from [Dymension Docs](https://docs.dymension.xyz/build/roller/overview) to create a rollApp. After that you've had successfully created a rollApp.

```bash
roller config show
```

You will see the information of the created rollApp.

### maroon rollApp info:

* DA = "celestia"
* Decimals = 18
* Denom = "uMRN"
* Home = "/root/.roller"
* RollappBinary = "/usr/local/bin/rollapp_evm"
* RollappID = "maroon_1206887-1"
* RollerVersion = "v1.0.6"
* TokenSupply = "1000000000"
* VMType = "evm"

**HubData**
  * API_URL = "https://froopyland.blockpi.network:443/lcd/v1/public"
  * ARCHIVE_RPC_URL = "https://froopyland.blockpi.network:443/rpc/v1/public"
  * GAS_PRICE = "20000000000"
  * ID = "froopyland_100-1"
  * RPC_URL = "https://froopyland.blockpi.network:443/rpc/v1/public"

view this rollapp on testnet: https://fl.dym.fyi/rollapp/maroon_1206887-1

### EVM RPC
When you run the rollApp in the local machine, you have to expose the EVM RPC local port 8545. you can use services like ngrok to do it or alternatively, add a proxy server with DNS Records for the port.

Maroon rollApp EVM RPC: https://rpc-dev.maroon.io

## Fund you account with native tokens (MRN)

After succesfully creating a EVM rollApp dymension testnet. you need native tokens to execute transactions like transfer, contract deployment etc.

```bash
roller keys list
```

should return

```
🔑 Addresses:
  my_celes_key        | RollApp Sequencer account on the Celestia network
  hub_sequencer       | RollApp Sequencer account on the Dymension Hub
  rollapp_sequencer   | RollApp Sequencer account on the RollApp
  relayer-hub-key     | IBC relayer account on Dymension Hub
  relayer-rollapp-key | IBC relayer account on RollApp
```

```bash
roller keys export hub_sequencer
```

Add the exported private key in your wallet, and you can distribute native tokens to users from this account.

## Example contract deployment
Follow these steps to deploy contracts to the maroon rollApp

Repo: https://github.com/manoranjith-shankar/protocol

```bash
cd contracts/zero-ex
```

> **_NOTE:_**  This repo is undergoing a tooling change. If adding a contract, you will need to
> add it to `compiler.json`. You can generate the entire list by running the following:
> `find . -type f -name "*.sol" | grep -v foundry | grep -v "contracts/dep" | grep -v "node_modules"`

## Installation

**Install**

```bash
npm install @0x/contracts-zero-ex --save
```

### Install Dependencies

If you don't have yarn workspaces enabled (Yarn < v1.0) - enable them:

```bash
yarn config set workspaces-experimental true
```

Then install dependencies

```bash
yarn install
```

### Build

To build this package and all other monorepo packages that it depends on, run the following from the monorepo root directory:

```bash
PKG=@0x/contracts-zero-ex yarn build
```

Or continuously rebuild on change:

```bash
PKG=@0x/contracts-zero-ex yarn watch
```

## Deploy full ZeroEx contract using forge create

```
forge create --rpc-url "https://rpc-dev.maroon.io" --constructor-args "initializeCaller_address" --private-key <PRIVATE_KEY> contracts/src/migrations/FullMigration.sol:FullMigration
```
**Should return**
```
[⠊] Compiling...
[⠰] Installing Solc version 0.6.12
[⠔] Successfully installed Solc 0.6.12
[⠘] Compiling 79 files with Solc 0.6.12
[⠃] Solc 0.6.12 finished in 6.51s
Compiler run successful!
Deployer: initializeCaller_address
Deployed to: deployed_address
Transaction hash: txHash
```

View transaction on explorer: https://explorer.silknodes.io/testnet-dymension/tx/{tx_hash}