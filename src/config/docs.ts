import type { MainNavItem, SidebarNavItem } from "~/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "DeFi",
      href: "/defi",
    },
    {
      title: "Zakat",
      href: "/zakat"
    },
    {
      title: "NFT",
      href: "/nft"
    },
    {
      title: "Fundraising",
      href: "/fundraising"
    },
  ],
};
