import { create } from "zustand";
import { ISetUserStore, IUserStoreState } from "./types";

export const useCounterStore = create<IUserStoreState>(
  (set: ISetUserStore) => ({
    user: {},
    setUser: (userData) => set({ user: userData }),
  })
);
