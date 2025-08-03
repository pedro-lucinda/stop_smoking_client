"use client";

import { useUser} from "@auth0/nextjs-auth0";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function UserButton() {
  const { user } = useUser();

  return (
    <>
      {!user ? (
        <div className="flex flex-col">
          <Link
            href="/auth/login?returnTo=/user"
            className="p-2 flex items-center gap-2 rounded-sm bg-blue-100 w-[80px] font-bold justify-center text-blue-900"
          >
            Login
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <Image
              src={user.picture || "/no-profile-picture.webp"}
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full border-2 border-blue-500"
            />
          </PopoverTrigger>
          <PopoverContent className="w-[150px] flex flex-col ">
            <div className="flex flex-col">
              <Link
                href="/auth/logout"
                className="p-2 flex items-center gap-2 hover:underline "
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
