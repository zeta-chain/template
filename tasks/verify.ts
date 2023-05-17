import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getFullyQualifiedName } from "hardhat/utils/contract-names";
import axios from "axios";
import FormData from "form-data";
import select from "@inquirer/select";

const URL = "https://server.sourcify.athens2.zetachain.com/verify";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const names = await hre.artifacts.getAllFullyQualifiedNames();
  if (names.length === 0) {
    console.error(
      "❌ Error: no contracts found. Please make sure there are compiled contracts."
    );
    return;
  }

  const chosen = parseInt(
    await select({
      message: "Select a contract to verify:",
      choices: names.map((name, i) => ({ name, value: i.toString() })),
    })
  );
  const [path, name] = names[chosen].split(":");

  const metadata = await hre.artifacts.getBuildInfo(
    getFullyQualifiedName(path, name)
  );
  const source = metadata?.input.sources[path]?.content;

  if (source) {
    const formData = new FormData();
    formData.append("address", args.contract);
    formData.append("chain", "7001");
    formData.append("chosenContract", chosen.toString());
    formData.append("files", Buffer.from(source), {
      filename: `${name}.sol`,
      contentType: "text/plain",
    });
    formData.append("files", Buffer.from(JSON.stringify(metadata)), {
      filename: "metadata.json",
      contentType: "application/json",
    });

    const headers = { headers: formData.getHeaders() };
    try {
      await axios.post(URL, formData, headers);
      console.log(`✅ Contract verified: ${args.contract}`);
    } catch (error: any) {
      console.error(
        `❌ Error during contract verification: ${error.response.data.error}`
      );
    }
  } else {
    console.error(`❌ Source code not found for contract: ${name}`);
  }
};

const descTask = `Verify a contract on ZetaChain.`;
const descContractFlag = "Contract address to verify";

task("verify:zeta", descTask, main).addParam("contract", descContractFlag);
