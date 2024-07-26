import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet, sepolia, zetachainAthensTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, bscTestnet, zetachainAthensTestnet],
  ssr: true,
});
