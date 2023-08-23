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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "../ui/button";
import {
  getSukukWISLMContract,
  getWISLMERC20Contract,
} from "~/lib/sukuk/get-contract";

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
