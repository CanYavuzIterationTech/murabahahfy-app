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

const createFormSchema = (totalOwned: bigint) => {
  const totalOwnedNumber = Number(formatEther(totalOwned)); // 1.3

  return z.object({
    amount: z.coerce.number().min(0).max(totalOwnedNumber),
  });
};

const Deposit = () => {
  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const { data: balance } = useQuery(
    ["wislm-balance-sukuk"],
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

  const formSchema = createFormSchema(balance ?? BigInt(0));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onDepositSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!walletClient) return;
      if (!publicClient) return;
      if (!balance) return;

      const bigintDeposit = parseEther(values.amount.toString());

      const wislmPublic = getWISLMERC20Contract({
        publicClient,
      });

      const sukukWislmPublic = getSukukWISLMContract({
        publicClient,
      });
      // Get approval amount
      const approvalAmount = await wislmPublic.read.allowance([
        walletClient.account.address,
        sukukWislmPublic.address,
      ]);

      if (approvalAmount < bigintDeposit) {
        const { request } = await publicClient.simulateContract({
          ...wislmPublic,
          functionName: "approve",
          args: [sukukWislmPublic.address, balance],
          account: walletClient.account.address,
        });
        const hash = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });
      }

      const { request } = await publicClient.simulateContract({
        ...sukukWislmPublic,
        functionName: "deposit",
        args: [bigintDeposit],
        account: walletClient.account.address,
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      console.log(values);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onDepositSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="150.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    Amount of WISLM inside is {formatEther(balance ?? BigInt(0))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Deposit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Deposit;
