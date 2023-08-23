import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Quote = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shariah Oracle</CardTitle>
        <CardDescription>
          Shariah Oracle is an on-chain mechanism controlling a whitelist of
          smart contracts allowed for interaction (signing and listing in the
          in-app marketplace) through the HAQQ Wallet.
        </CardDescription>
        <CardDescription>
          The Shariah Oracle serves as an on-chain registry of Halal
          Certificates that provides smart contract developers and web2
          businesses a way to prove their ethical relevance for Muslim users by
          listing their products/services on the HAQQ Wallet.
        </CardDescription>
        <CardDescription>
          Integrating the Shariah Oracle with HAQQ Wallet will ensure that users
          interact only with whitelisted, Sharia-compliant dApps. Thus whilst
          being a place where anyone can deploy their dApp or project, HAQQ
          network&#39;s Shariah Oracle is a key measure to minimize unethical or
          Haram activity in our network.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Quote;
