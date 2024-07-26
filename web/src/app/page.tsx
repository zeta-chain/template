"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectBitcoin } from "@zetachain/universalkit";

const Page = () => {
  return (
    <div className="m-4">
      <div className="flex justify-end gap-2 mb-10">
        <ConnectBitcoin />
        <ConnectButton label="Connect EVM" showBalance={false} />
      </div>
      <div className="flex justify-center">
        <div className="w-[400px]">{/* Add components here */}</div>
      </div>
    </div>
  );
};

export default Page;
