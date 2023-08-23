/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import * as z from "zod";
import { formatEther, parseEther } from "viem";
import { usePublicClient, useQuery, useWalletClient } from "wagmi";

import {
  
  getWISLMERC20Contract,
} from "~/lib/sukuk/get-contract";
import PleaseConnect from "../general/please-connect";
import PleaseChangeNetwork from "../general/please-change-network";

const WISLMBalance = () => {
  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const { data: balance } = useQuery(
    ["wislm-balance-card"],
    async () => {
      if (!walletClient) return;
      if (!publicClient) return;
      const wislmPublic = getWISLMERC20Contract({
        publicClient,
      });
      const balance = await wislmPublic.read.balanceOf([
        walletClient.account.address,
      ]);
      return balance;
    },
    {
      enabled: !!walletClient && !!publicClient,
    }
  );


    if(!walletClient) return <PleaseConnect />
    if(walletClient.chain.id !== 54211) return <PleaseChangeNetwork />

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>WISLM Balance</CardDescription>
        <CardTitle>{balance ? formatEther(balance) : "0"}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default WISLMBalance;
