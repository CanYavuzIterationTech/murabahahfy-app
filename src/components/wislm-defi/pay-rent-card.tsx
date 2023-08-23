import { usePublicClient, useWalletClient } from "wagmi";
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

const PayRentCard = ({
  info,
  index,
}: {
  info: {
    amount: bigint;
    amountOriginal: bigint;
    startDate: bigint;
    endDate: bigint;
    isPaid: boolean;
  };
  index: number;
}) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay Rent</CardTitle>
        <CardDescription>
          End Date: {new Date(Number(info.endDate) * 1000).toDateString()}
        </CardDescription>
        <CardContent>
          <Button
            onClick={() => {
              payRent().catch((err) => console.error(err));
            }}
          >
            Pay Rent
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default PayRentCard;
