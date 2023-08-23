import type { MainNavItem, SidebarNavItem } from "~/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "W-Islm Deposit",
      href: "/wislm-deposit",
    },
    {
      title: "W-Islm Supply",
      href: "/wislm-supply"
    },
    {
      title: "W-Islm Rent",
      href: "/wislm-rent"
    },
    {
      title: "Zakat",
      href: "/zakat"
    },
    {
      title: "W-Gold Deposit?",
      href: "/wgold-deposit"
    }
  ],
};
