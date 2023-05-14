import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { drip } from "@zetachain/faucet-cli/dist/commands/drip";
import { VALID_CHAINS } from "@zetachain/faucet-cli/dist/constants";
import { walletError } from "./balances";

const useAFlagError = `
* Alternatively, you can request tokens for any address
  by using the --address flag:
  
  npx hardhat faucet --address <wallet_address>
`;

const getRecipientAddress = (args: any, hre: HardhatRuntimeEnvironment) => {
  if (args.address) {
    return args.address;
  } else if (process.env.PRIVATE_KEY) {
    return new hre.ethers.Wallet(process.env.PRIVATE_KEY).address;
  } else {
    console.error(walletError + useAFlagError);
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
