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
    ["rent-stuff"],
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
      const endDateUNIX =  Math.floor(values.end_date.getTime() / 1000);
      const currentDateUnix = Math.floor(Date.now() / 1000);
      

      const wislmPublic = getWISLMERC20Contract({
        publicClient,
      });

      const sukukWislmPublic = getSukukWISLMContract({
        publicClient,
      });
      // Get approval amount

   
      const { request } = await publicClient.simulateContract({
        ...sukukWislmPublic,
        functionName: "createRentContract",
        args: [bigintDeposit, BigInt((endDateUNIX - currentDateUnix))],
        account: walletClient.account.address,
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });


      const rents = await sukukWislmPublic.read.listRents([
        walletClient.account.address,
      ]);

      const lastItem = rents[rents.length - 1];
      
      console.log(lastItem);
      const address = walletClient.account.address;

      if (lastItem) {
        const endDate = new Date(Number(lastItem.endDate) * 1000);
        const startDate = new Date(Number(lastItem.startDate) * 1000);
        const count = formatEther(lastItem.amount);
        const indeksler = [
          {
            indeks: rents.length - 1,
          },
        ];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          adres: address,
          startdate: startDate,
          enddate: endDate,
          count: count,
          indeksler: indeksler,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

          console.log("Fetching");
        fetch(
          "https://suku-fi-chat-bot-097bd90d5893.herokuapp.com/addindex",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }

      console.log(values);
    } catch (err) {
      console.error(err);
    }
  }

  if (!walletClient) return <PleaseConnect />;

  if (walletClient.chain.id !== 54211) return <PleaseChangeNetwork />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rent</CardTitle>
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
                    Amount of WISLM inside is{" "}
                    {formatEther(balance ?? BigInt(0))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick end date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {

                          return date < minDate || date > maxDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Min rent is 30 days. Max rent is 365 days.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Rent</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WislmRent;
