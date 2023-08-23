import Link from "next/link";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
//import { CommandMenu } from "~/components/command-menu"
import { Icons } from "~/components/icons";
import { MainNav } from "~/components/header/main-nav";
import { MobileNav } from "~/components/header/mobile-nav";
import { ModeToggle } from "~/components/mode-toggle";
import { buttonVariants } from "~/components/ui/button";

import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <MainNav />
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/*<CommandMenu />*/}
          </div>
          <nav className="flex items-center gap-2">
            <ModeToggle />

            {hydrated && <Web3Button />}
          </nav>
        </div>
      </div>
    </header>
  );
}
