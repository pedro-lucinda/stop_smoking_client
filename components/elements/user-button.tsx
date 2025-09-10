"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { LogOut, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiService } from "services/api";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LoginButton } from "./login-button";

export function UserButton() {
  const { user } = useUser();
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleResetClick = () => {
    setShowResetDialog(true);
  };

  const handleResetConfirm = async () => {
    setIsResetting(true);
    try {
      await apiService.resetUserData();
      // Redirect to home page and refresh
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Reset error:", error);
      alert("Failed to reset data. Please try again.");
      setShowResetDialog(false);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      {!user ? (
        <LoginButton />
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
          <PopoverContent className=" w-[150px] p-0 px-1 flex flex-col">
            <div className="flex flex-col">
              <button
                onClick={handleResetClick}
                disabled={isResetting}
                className="p-2 flex items-center gap-2 text-red-500 hover:underline text-left disabled:opacity-50 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                {isResetting ? "Resetting..." : "Reset Data"}
              </button>
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

      <ConfirmationDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        title="Reset All Data"
        description="Are you sure you want to reset all your data? This will delete your preferences, cravings, diary entries, and all other user information. This action cannot be undone."
        confirmText="Reset Data"
        cancelText="Cancel"
        onConfirm={handleResetConfirm}
        isLoading={isResetting}
      />
    </>
  );
}
