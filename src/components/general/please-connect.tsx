import { useWalletClient } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Web3Button } from "@web3modal/react";

const PleaseConnect = () => {
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
};

export default PleaseConnect;
