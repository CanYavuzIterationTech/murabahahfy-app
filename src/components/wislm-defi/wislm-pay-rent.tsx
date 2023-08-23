/* eslint-disable @typescript-eslint/no-misused-promises */
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import PleaseConnect from "../general/please-connect";
import PleaseChangeNetwork from "../general/please-change-network";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import PayRentCard from "./pay-rent-card";

const createFormSchema = (totalOwned: bigint) => {
  const totalOwnedNumber = Number(formatEther(totalOwned)); // 1.3

  return z.object({
    amount: z.coerce.number().min(0).max(totalOwnedNumber),
    // min date is 31 days from now
    end_date: z.date().refine((date) => {
      const now = new Date();
      const thirtyOneDaysFromNow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 31
      );
      return date >= thirtyOneDaysFromNow;
    }),
  });
};

const WislmRent = () => {
  const today = new Date();
  const minDate = new Date(today);
  const maxDate = new Date(today);

  minDate.setDate(minDate.getDate() + 31); // 31 days into the future
  maxDate.setDate(maxDate.getDate() + 364); // 364 days into the future

  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const { data: balance } = useQuery(
    ["pay-rent-stuff"],
    async () => {
      if (!walletClient) return;
      if (!publicClient) return;

      const wislmSukukPublic = getSukukWISLMContract({
        publicClient,
      });

      const balance = await wislmSukukPublic.read.tokenBalance([
        walletClient.account.address,
      ]);
      return balance;
    },
    {
      enabled: !!walletClient && !!publicClient,
    }
  );

  const { data: rents } = useQuery(
    ["pay-rent-stuff2"],
    async () => {
      if (!walletClient) return;
      if (!publicClient) return;

      const wislmSukukPublic = getSukukWISLMContract({
        publicClient,
      });

      const balance = await wislmSukukPublic.read.listRents([
        walletClient.account.address,
      ]);

      return balance;
    },
    {
      enabled: !!walletClient && !!publicClient,
    }
  );
  console.log("Rents: ", rents);
  const formSchema = createFormSchema(balance ?? BigInt(0));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!walletClient) return <PleaseConnect />;

  if (walletClient.chain.id !== 54211) return <PleaseChangeNetwork />;

  if (rents && rents.length > 0) {
    return (
      <div className="mt-4 flex flex-col gap-7">
        {" "}
        {rents.map((rent, index) => {
           
           if(rent.isPaid === false) return <PayRentCard info={rent} index={index} key={index} />;
        })}
      </div>
    );
  }

  return <div></div>;
};

export default WislmRent;
