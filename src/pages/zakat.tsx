import Head from "next/head";
import Quote from "~/components/zakat/quote";
import ZakatCard from "~/components/zakat/zakat-card";


export default function Home() {
  return (
    <>
      <Head>
        <title>Zakat</title>
        <meta name="description" content="Pay your zakat instantly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col w-full max-w-2xl items-center pt-10 gap-7">
        <ZakatCard />
        <Quote />
      </main>
    </>
  );
}
