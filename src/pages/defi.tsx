import Head from "next/head";
import DepositWithdraw from "~/components/wislm-defi/deposit-withdraw";
import WISLMBalance from "~/components/wislm-defi/wislm-balance";

const Defi = () => {
  return (
    <>
      <Head>
        <title>Defi</title>
        <meta name="description" content="Do your sukut operations in here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex w-full max-w-2xl flex-col items-center gap-7 pt-10">
        <WISLMBalance />
        <DepositWithdraw />



      </main>
    </>
  );
};

export default Defi;
