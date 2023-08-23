import { usePublicClient, useQuery, useWalletClient } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  getSukukWISLMContract,
  getWISLMERC20Contract,
} from "~/lib/sukuk/get-contract";
import { sukukAbi } from "~/lib/sukuk/abi";
import { Button } from "../ui/button";
import { formatEther, parseEther } from "viem";
import Link from "next/link";

const PayRentCard = ({
  info,
  index,
  specificInfo,
}: {
  info: {
    amount: bigint;
    amountOriginal: bigint;
    startDate: bigint;
    endDate: bigint;
    isPaid: boolean;
  };
  index: number;
  specificInfo: string | undefined;
}) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { data: res } = useQuery(
    ["lol", index],
    async () => {
      if (!specificInfo) return;
      const res = await fetch(specificInfo);

      return await res.json() as {url: string | null};


    },
    {
      enabled: !!specificInfo,
    }
  );

  const payRent = async () => {
    try {
      if (!walletClient) return;
      if (!publicClient) return;

      const contract = getSukukWISLMContract({
        publicClient,
      });

      const wislmPublic = getWISLMERC20Contract({
        publicClient,
      });
      const approvalAmount = await wislmPublic.read.allowance([
        walletClient.account.address,
        contract.address,
      ]);

      if (approvalAmount < info.amount) {
        const { request } = await publicClient.simulateContract({
          ...wislmPublic,
          functionName: "approve",
          args: [contract.address, info.amount],
          account: walletClient.account.address,
        });
        const hash = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });
      }

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "payRent",
        account: walletClient.account.address,
        args: [BigInt(index)],
      });

      const hash = await walletClient.writeContract(request);

      await publicClient.waitForTransactionReceipt({ hash });

      const rents = await contract.read.listRents([
        walletClient.account.address,
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  {
    console.log(specificInfo);
  }
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle>Pay Rent</CardTitle>
          <CardDescription>
            End Date: {new Date(Number(info.endDate) * 1000).toDateString()}
          </CardDescription>
        </div>

        { res?.url && (
          <Button asChild>
            <Link href={res.url}> PDF</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            payRent().catch((err) => console.error(err));
          }}
        >
          Pay Rent
        </Button>
      </CardContent>
    </Card>
  );
};

export default PayRentCard;
