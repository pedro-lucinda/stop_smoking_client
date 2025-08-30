"use client";
import { UserButton } from "@/components/elements/user-button";
import { useUser } from "@auth0/nextjs-auth0";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useAppStore } from "store/app-store";
import { SIDEBAR_MENU_ITEMS } from "utils/constants";
import { SidebarItem } from "./item";
import { SidebarHeader } from "./sidebar-header";

export interface SidebarNavItem {
  id: number;
  title: string;
  route: `/${string}`;
  icon: ReactElement;
}
export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = useAppStore((s) => s.isSidebarOpen);
  const width = isOpen ? 250 : 110;
  const { user } = useUser();

  return (
    <div
      style={{ width: `${width}px` }}
      className={`${
        !user
          ? "hidden"
          : "flex-none flex flex-col h-full overflow-hidden border-r transition-width duration-700 ease-in-out p-3"
      }`}
    >
      <SidebarHeader />
      <div className="flex flex-col w-full gap-3">
        {SIDEBAR_MENU_ITEMS?.map((i) => (
          <SidebarItem
            key={i.id}
            onClick={() => router.push(i.route)}
            title={i.title}
            icon={i.icon}
            isSelected={pathname === i.route}
            showText={isOpen}
          />
        ))}
      </div>
      <UserButton />
    </div>
  );
}
