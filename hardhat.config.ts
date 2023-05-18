import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { getHardhatConfigNetworks } from "@zetachain/addresses-tools/dist/networks";

import "./tasks/account";
import "./tasks/faucet";
import "./tasks/balances";
import "./tasks/verify";

dotenv.config();
const PRIVATE_KEYS =
  process.env.PRIVATE_KEY !== undefined ? [`0x${process.env.PRIVATE_KEY}`] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ...getHardhatConfigNetworks(PRIVATE_KEYS),
  },
};

export default config;
