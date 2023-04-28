import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Please set PRIVATE_KEY. Run: npx hardhat account --save");
  }

  const { address } = new hre.ethers.Wallet(process.env.PRIVATE_KEY);

  try {
    await axios.get(`https://faucet.zetachain.link/eth/${address}`);
    console.log(`✅ Tokens requested successfully for ${address}`);
  } catch (error) {
    console.error("❌ Error requesting token from the faucet.");
  }
};

task("faucet", "").setAction(main);
