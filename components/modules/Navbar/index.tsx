"use client";
import { UserButton } from "@/components/elements/user-button";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";
import { SIDEBAR_MENU_ITEMS } from "utils/constants";
import { NavbarItem } from "./item";

export interface INavbarNavItem {
  id: number;
  title: string;
  route: string;
  icon: ReactElement;
}
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full h-15 bg-blue-950">
      <div className="container mx-auto flex items-center w-full px-10">
        <p
          className="font-bold text-sm text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          Stop Smok buddy
        </p>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-3 py-2">
            {SIDEBAR_MENU_ITEMS?.map((i) => (
              <NavbarItem
                key={i.id}
                onClick={() => router.push(i.route)}
                isSelected={pathname === i.route}
                {...i}
              />
            ))}
          </div>
        </div>
        <UserButton />
      </div>
    </nav>
  );
}
