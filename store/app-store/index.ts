import { create } from "zustand";
import type { IAppStoreState, ISetAppStore } from "./types";

export const useAppStore = create<IAppStoreState>((set: ISetAppStore) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
}));
