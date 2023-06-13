import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { getHardhatConfigNetworks } from "@zetachain/networks";
import "@zetachain/toolkit/tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ...getHardhatConfigNetworks(),
  },
};

export default config;
