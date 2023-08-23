import Head from "next/head";
import { useEffect, useState } from "react";
import DepositWithdraw from "~/components/wislm-defi/deposit-withdraw";
import WISLMBalance from "~/components/wislm-defi/wislm-balance";

const WislmDeposit = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydrated(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Defi</title>
        <meta name="description" content="Do your sukut operations in here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex w-full max-w-2xl flex-col items-center gap-7 pt-10">
        {hydrated && <WISLMBalance />}
        {hydrated && <DepositWithdraw /> }
      </main>
    </>
  );
};

export default WislmDeposit;
