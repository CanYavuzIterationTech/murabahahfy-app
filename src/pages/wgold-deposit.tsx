import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function WGoldDeposit() {
  return (
    <>
      <Head>
        <title>Sukufi</title>
        <meta name="description" content="Halal blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex justify-center gap-7 h-screen">
        <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-4xl font-bold">W-Gold Deposit?</h1>
        <h2 className="text-2xl font-semibold">
         Coming soon :)
        </h2>
        
        </div>
       
      </main>
    </>
  );
}
