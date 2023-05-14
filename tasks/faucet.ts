import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { drip } from "@zetachain/faucet-cli/dist/commands/drip";
import { VALID_CHAINS } from "@zetachain/faucet-cli/dist/constants";

const walletError = `
❌ Error: Wallet address not found.

To resolve this issue, please follow these steps:

* Set your PRIVATE_KEY environment variable. You can write
  it to a .env file in the root of your project like this:

  PRIVATE_KEY=123... (without the 0x prefix)
  
  Or you can generate a new private key by running:

  npx hardhat account --save

* Alternatively, you can fetch the balance of any address
  by using the --address flag:
  
  npx hardhat balances --address <wallet_address>
`;

const getRecipientAddress = (args: any, hre: HardhatRuntimeEnvironment) => {
  if (args.address) {
    return args.address;
  } else if (process.env.PRIVATE_KEY) {
    return new hre.ethers.Wallet(process.env.PRIVATE_KEY).address;
  } else {
    console.error(walletError);
    throw new Error();
  }
};

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  if (!VALID_CHAINS.includes(args.chain)) {
    const chainNameError = `❌ Invalid chain: ${args.chain}. Must be one of: ${VALID_CHAINS}`;
    return console.error(chainNameError);
  }

  try {
    const address = getRecipientAddress(args, hre);
    await drip({ chain: args.chain, address }, []);
  } catch (error) {}
};

const descTask = `Request ZETA tokens from the faucet on a specific chain.`;
const descAddressFlag = `Recipient address. (default: address derived from PRIVATE_KEY env variable)`;
const descChainFlag = `Blockchain network where tokens will be sent.`;

task("faucet", descTask, main)
  .addOptionalParam("address", descAddressFlag)
  .addParam("chain", descChainFlag, "zetachain_athens");
