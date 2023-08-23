import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  useAccount,
  useBalance,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { zeroAddress } from "viem";
import { useState } from "react";
import TransactionModal from "../transaction/transaction-modal";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

const ZakatCard = () => {
  const account = useAccount();
  const { data: balance } = useBalance({ address: account.address });
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [processingDialog, setProcessingDialogOpen] = useState(false);
  const [successDialog, setSuccessDialogOpen] = useState(false);
  const [failDialog, setFailDialogOpen] = useState(false);
  const [hash, setHash] = useState("");

  const payZakat = async () => {
    try {
      if (!walletClient) return;
      if (!balance) return;
      if (!publicClient) return;

      const hash = await walletClient.sendTransaction({
        to: zeroAddress,
        value: balance.value / BigInt(40),
      });
      setProcessingDialogOpen(true);
      setHash(hash);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setProcessingDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (err) {
      console.error(err);
      setProcessingDialogOpen(false);
      setFailDialogOpen(true);
    }
  };

  if (!walletClient)
    return (
      <Card>
        <CardHeader>
          <CardTitle> Please connect your wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <Web3Button />
        </CardContent>
      </Card>
    );

  if (walletClient.chain.id !== 54211)
    return (
      <Card>
        <CardHeader>
          <CardTitle> Please switch to Haqq Chain Testnet</CardTitle>
        </CardHeader>
        <CardContent>
          <Web3NetworkSwitch />
        </CardContent>
      </Card>
    );

  return (
    <>
      <TransactionModal
        processingDialog={processingDialog}
        successDialog={successDialog}
        setSuccessDialogOpen={setSuccessDialogOpen}
        hash={hash}
        failDialog={failDialog}
        failDialogOpen={setFailDialogOpen}
      />
      <Card>
        <CardHeader>
          <CardTitle>Zakat</CardTitle>
          <CardDescription>
            Zakat is a mandatory Islamic obligation that every Muslim must pay
            once a year. With Shariah compliant DeFi, you can pay your Zakat to{" "}
            <a
              className="text-primary hover:underline"
              href="https://haqq.network/wp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shariah Oracle
            </a>{" "}
            whitelisted charities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              payZakat().catch((err) => {
                console.error(err);
              });
            }}
          >
            Pay Zakat to Haqq Finance
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ZakatCard;
