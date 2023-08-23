import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import { Icons } from "~/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/wislm-deposit"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/wislm-deposit"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          W-ISLM Deposit
        </Link>
        <Link
          href="/wislm-supply"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/wislm-supply"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          W-ISLM Supply
        </Link>
        <Link
          href="/wislm-rent"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/wislm-rent"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          W-ISLM Rent
        </Link>

        <Link
          href="/zakat"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/zakat" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Zakat
        </Link>
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>
      </nav>
    </div>
  );
}
