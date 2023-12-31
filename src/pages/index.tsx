import Head from "next/head";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>SukuFi</title>
        <meta name="description" content="Halal blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex justify-center gap-7 h-screen">
        <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-4xl font-bold">SukuFi</h1>
        <h2 className="text-2xl font-semibold">
          World&#39;s first Shariah compliant DeFi Sukuk platform.
        </h2>
        <p className="text-xl">Start by depositing your Wrapped ISLM tokens.</p>
        <Button variant={"outline"} asChild>
        <Link href="wislm-deposit">
            To Deposit!
        </Link>
        </Button>
        </div>
       
      </main>
      
    </>
  );
}
