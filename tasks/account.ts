import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as envfile from "envfile";
import * as fs from "fs";
import * as path from "path";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const { privateKey, address, mnemonic } = hre.ethers.Wallet.createRandom();
  console.log(`
🔑 Private key: ${privateKey}
🔐 Mnemonic phrase: ${mnemonic.phrase}
😃 Address: ${address}
`);

  if (args.save) {
    const filePath = path.join(process.cwd(), ".env");
    let env = envfile.parse(
      fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : ""
    );
    env.PRIVATE_KEY = privateKey.slice(2);
    fs.writeFileSync(filePath, envfile.stringify(env));
    console.log(`✅ Saved the private key to '${filePath}' file.\n`);
  }
};
const descTask = `Generates a new account and prints its private key, mnemonic phrase, and address to the console.`;
const descSaveFlag = `Saves the private key to a '.env' file in the project directory.`;

task("account", descTask, main).addFlag("save", descSaveFlag);
