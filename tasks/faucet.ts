import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { drip } from "@zetachain/faucet-cli/dist/commands/drip";

dotenv.config();

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  let address = "";
  if (args.address) {
    address = args.address;
  } else if (process.env.PRIVATE_KEY) {
    address = new hre.ethers.Wallet(process.env.PRIVATE_KEY).address;
    console.log(
      `Using address derived from the PRIVATE_KEY env variable: ${address}`
    );
  } else {
    console.error(
      "❌ Error: please, provide an address as a flag or create a wallet with: npx hardhat account --save"
    );
  }
  await drip({ chain: args.chain, address }, []);
};

task(
  "faucet",
  `Request ZETA tokens from the faucet. If --address flag is not set, the faucet will default to the address derived from the wallet defined in PRIVATE_KEY env variable. If you don't have a wallet yet, use npx hardhat account --save to create a wallet in .env. Valid values for --chain flag are: zetachain_athens, goerli, bsc_testnet, polygon_mumbai. You can install a standalone version of the CLI faucet with: npm i -g @zetachain/faucet-cli`
)
  .addOptionalParam(
    "address",
    "Recipient address where tokens will be sent. (default: address derived from PRIVATE_KEY env variable)"
  )
  .addParam(
    "chain",
    "Blockchain network where tokens will be sent.",
    "zetachain_athens"
  )
  .setAction(main);
