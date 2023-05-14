import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { getAddress } from "@zetachain/addresses";
import ZetaEth from "@zetachain/interfaces/abi/json/contracts/Zeta.eth.sol/ZetaEth.json";

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

async function fetchNativeBalance(
  address: string,
  provider: ethers.providers.JsonRpcProvider
) {
  const balance = await provider.getBalance(address);
  return parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
}

async function fetchZetaBalance(
  address: string,
  provider: ethers.providers.JsonRpcProvider,
  networkName: string
) {
  if (networkName === "athens") return "";
  const zetaAddress = getAddress({
    address: "zetaToken",
    networkName,
    zetaNetwork: "athens",
  });
  const contract = new ethers.Contract(zetaAddress, ZetaEth, provider);
  const balance = await contract.balanceOf(address);
  return parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
}

async function fetchBalances(
  address: string,
  provider: ethers.providers.JsonRpcProvider,
  networkName: string
) {
  try {
    const { url } = hre.config.networks[networkName];
    const native = await fetchNativeBalance(address, provider);
    const zeta = await fetchZetaBalance(address, provider, networkName);

    return { networkName, native, zeta };
  } catch (error) {}
}

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  let address: string;
  if (args.address) {
    address = args.address;
  } else if (process.env.PRIVATE_KEY) {
    address = new hre.ethers.Wallet(process.env.PRIVATE_KEY).address;
  } else {
    return console.error(walletError);
  }

  const balancePromises = Object.keys(hre.config.networks).map(
    (networkName) => {
      const { url } = hre.config.networks[networkName];
      const provider = new ethers.providers.JsonRpcProvider(url);
      return fetchBalances(address, provider, networkName);
    }
  );

  const balances = await Promise.all(balancePromises);
  const filteredBalances = balances.filter((balance) => balance != null);

  console.log(`
📊 Balances for ${address}
`);
  console.table(filteredBalances);
};

const descTask = `Fetch native and ZETA token balances`;
const descAddressFlag = `Fetch balances for a specific address`;

task("balances", descTask, main).addOptionalParam("address", descAddressFlag);
