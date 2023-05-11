import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { getAddress } from "@zetachain/addresses";
import ZetaEth from "@zetachain/interfaces/abi/json/contracts/Zeta.eth.sol/ZetaEth.json";

dotenv.config();

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Please set PRIVATE_KEY. Run: npx hardhat account --save");
  }

  const { address } = new hre.ethers.Wallet(process.env.PRIVATE_KEY);
  let balances: any[] = [];

  for (const networkName in hre.config.networks) {
    try {
      const { url } = hre.config.networks[networkName];
      const zetaAddress = getAddress({
        address: "zetaToken",
        networkName,
        zetaNetwork: "athens",
      });
      const provider = new ethers.providers.JsonRpcProvider(url);

      const nb = await provider.getBalance(address);
      const native = parseFloat(ethers.utils.formatEther(nb)).toFixed(2);

      const zetaContract = new ethers.Contract(zetaAddress, ZetaEth, provider);
      const zb = await zetaContract.balanceOf(address);
      const zeta = parseFloat(ethers.utils.formatEther(zb)).toFixed(2);

      balances.push({ networkName, native, zeta });
    } catch (error) {
      continue;
    }
  }

  console.log(`
📊 Balances for ${address}
`);
  console.table(balances);
};

const taskDesc = "Fetch native and ZETA token balances";
const addressDesc = "Fetch balances for a specific address";

task("balances", taskDesc, main).addOptionalParam("address", addressDesc);
