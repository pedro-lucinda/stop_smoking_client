/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserStoreState {
  user: any;
  setUser: (user: any) => void;
}
import { StoreApi } from "zustand";

export type ISetUserStore = StoreApi<IUserStoreState>["setState"];
export type IGetUserStore = StoreApi<IUserStoreState>["getState"];
