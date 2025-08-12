import type { StoreApi } from "zustand";

export interface IAppStoreState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export type ISetAppStore = StoreApi<IAppStoreState>["setState"];
export type IGetAppStore = StoreApi<IAppStoreState>["getState"];
