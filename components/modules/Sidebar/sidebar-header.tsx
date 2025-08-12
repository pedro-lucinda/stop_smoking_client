"use client";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "store/app-store";

export function SidebarHeader() {
  const router = useRouter();
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  return (
    <div
      className="flex flex-col items-center  h-[98px] p-5 gap-2"
      onClick={() => router.push("/user")}
    >
      {isSidebarOpen ? (
        <div>
          <h3 className="font-bold text-md">Stop Smok buddy</h3>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-md">SSB</h3>
        </div>
      )}
      {!isSidebarOpen ? (
        <PanelRightClose
          className="w-5 h-5 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      ) : (
        <PanelRightOpen
          className="w-5 h-5 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
