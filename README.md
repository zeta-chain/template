# Template for a ZetaChain Hardhat Project

This is a simple Hardhat template that provides a starting point for developing
smart contract applications on the ZetaChain blockchain.

## Prerequisites

Before getting started, ensure that you have
[Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com/)
installed on your system.

## Getting Started

To get started, install the necessary dependencies by running the following
command in your terminal:

```
yarn
```

## Hardhat Tasks

This template includes two Hardhat tasks that can be used to generate a random
wallet and request tokens from ZetaChain's faucet.

### Generating a Random Wallet

To generate a random wallet, run the following command in your terminal:

```
npx hardhat account --save
```

This will generate a random wallet, print information about the wallet to the
terminal, and save the private key to a `.env` file to make it accessible to
Hardhat. If you don't want to save the wallet (for example, if you just need an
address to send tokens to), you can run the command without the `--save` flag.

### Querying for Token Balances

To query for token balances, run the following command in your terminal:

```
npx hardhat balances
```

This command will query token balances for the account address derived from the
private key specified in the `.env`.

If you want to query for token balances for a different account, you can use the
`--address` flag:

```
npx hardhat balances --address <address>
```

### Requesting Tokens from the Faucet

To request tokens from ZetaChain's faucet using the account from the `.env`
file, run the following command in your terminal:

```
npx hardhat faucet
```

To install a standalone faucet, run the following command in your terminal:

```
npm install -g @zetachain/faucet-cli
```

You can then use it with the following command:

```
zetafaucet -h
```

### Verifying a Contract

You can verify a deployed contract with the following command:

```
npx hardhat verify:zeta --contract <address>
```

Select the contract to verify:

```
? Select a contract to verify: (Use arrow keys)
  @zetachain/zevm-protocol-contracts/contracts/interfaces/IZRC20.sol:IZRC20
  @zetachain/zevm-protocol-contracts/contracts/interfaces/zContract.sol:zContract
❯ contracts/Withdraw.sol:Withdraw
```

After the confirmation the contract will be verified.

## Next Steps

To learn more about building decentralized apps on ZetaChain, follow the
tutorials available in
[the documentation](https://www.zetachain.com/docs/developers/overview/).
