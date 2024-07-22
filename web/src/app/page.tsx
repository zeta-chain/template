"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Swap,
  Balances,
  StakingRewards,
  Profile,
  ConnectBitcoin,
  useZetaChainClient,
  useEthersSigner,
} from "@zetachain/universalkit";
import { useAccount, useChainId, useWalletClient } from "wagmi";

const contract = "0xb459F14260D1dc6484CE56EB0826be317171e91F";

const Page = () => {
  const account = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const signer = useEthersSigner({ walletClient });
  const client = useZetaChainClient({ network: "testnet", signer });

  return (
    <div className="m-4">
      <div className="flex justify-end gap-2 mb-10">
        <ConnectBitcoin />
        <ConnectButton label="Connect EVM" showBalance={false} />
      </div>
      <div className="flex justify-center">
        <div className="w-[400px]">
          {client && (
            <div className="flex flex-col gap-10 ">
              <StakingRewards
                client={client}
                account={account}
              ></StakingRewards>
              {/* <Balances client={client} account={account}></Balances>
              <Swap client={client} account={account} contract={contract} />
              <div className="flex justify-center">
                <Profile address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
