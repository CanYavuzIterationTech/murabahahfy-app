import { type AppType } from "next/dist/shared/lib/utils";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { SiteHeader } from "~/components/header/site-header";
import { ThemeProvider } from "~/components/theme-provider";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";
import "~/styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import SiteFooter from "~/components/footer/footer";
import Chat from "~/components/chat-bot/chat";

const chains = [haqqMainnet, haqqTestedge2];
const projectId = "42418971c8d5230992d8f3e68dbe111b";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
        
          <Component {...pageProps} />
    
          <SiteFooter />
        </ThemeProvider>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}

      />
    </>
  );
};

export default MyApp;
