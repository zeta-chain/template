import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as envfile from "envfile";
import * as fs from "fs";

const main = async ({ save }: any, hre: HardhatRuntimeEnvironment) => {
  const { privateKey, address } = hre.ethers.Wallet.createRandom();
  console.log(`\n🔑 Private key: ${privateKey}`);
  console.log(`😃 Address: ${address}\n`);
  if (save) {
    const p = ".env";
    let env = envfile.parse(fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
    env.PRIVATE_KEY = privateKey.slice(2);
    fs.writeFileSync(p, envfile.stringify(env));
    console.log(`✅ Saved the private key to '${p}' file.\n`);
  }
};

task("account", "").addFlag("save").setAction(main);
