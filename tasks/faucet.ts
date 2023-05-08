import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { drip } from "@zetachain/faucet-cli/dist/commands/drip";

dotenv.config();

const getRecipientAddress = (args: any, hre: HardhatRuntimeEnvironment) => {
  if (args.address) {
    return args.address;
  }

  if (process.env.PRIVATE_KEY) {
    const address = new hre.ethers.Wallet(process.env.PRIVATE_KEY).address;
    const descNote = `Using address derived from the PRIVATE_KEY env variable: ${address}`;
    console.log(descNote);
    return address;
  }

  const descError = `❌ Error: please, provide an address as a flag or create a wallet with: npx hardhat account --save`;
  console.error(descError);
};

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  try {
    const address = getRecipientAddress(args, hre);
    await drip({ chain: args.chain, address }, []);
  } catch (error) {
    console.error(error);
  }
};

const descTask = `Request ZETA tokens from the faucet. If --address flag is not set, the faucet will default to the address derived from the wallet defined in PRIVATE_KEY env variable. If you don't have a wallet yet, use npx hardhat account --save to create a wallet in .env. Valid values for --chain flag are: zetachain_athens, goerli, bsc_testnet, polygon_mumbai. You can install a standalone version of the CLI faucet with: npm i -g @zetachain/faucet-cli`;
const descAddressFlag = `Recipient address where tokens will be sent. (default: address derived from PRIVATE_KEY env variable)`;
const descChainFlag = `Blockchain network where tokens will be sent.`;

task("faucet", descTask)
  .addOptionalParam("address", descAddressFlag)
  .addParam("chain", descChainFlag, "zetachain_athens")
  .setAction(main);
