"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useChainId, useWalletClient } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { UniversalKitProvider, useEthersSigner } from "@zetachain/universalkit";
import { config } from "../wagmi";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const rainbowKitTheme = theme === "dark" ? darkTheme() : lightTheme();

  return (
    <RainbowKitProvider theme={rainbowKitTheme}>{children}</RainbowKitProvider>
  );
};

const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const signer = useEthersSigner({ walletClient });

  if (!signer) null;

  const zetaConfig = {
    network: "testnet",
    signer,
    chains: {
      zeta_testnet: {
        api: [
          {
            url: "https://zetachain-athens.g.allthatnode.com/archive/evm",
            type: "evm",
          },
        ],
      },
    },
  };

  return (
    <UniversalKitProvider
      config={config}
      client={queryClient}
      zetaChainConfig={zetaConfig}
    >
      {children}
    </UniversalKitProvider>
  );
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiWrapper>
            <ThemeProvider>{children}</ThemeProvider>
          </WagmiWrapper>
        </NextThemesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
