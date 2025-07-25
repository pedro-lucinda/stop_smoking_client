/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMotivation, IPreference, IUser } from "./types";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// 3) Central ApiService with dependency inversion & fetch binding fix
type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface ApiServiceOptions {
  fetchFn?: FetchFn;
  baseUrl?: string;
}

export class ApiService {
  private fetchFn: FetchFn;
  private baseUrl: string;

  constructor({ fetchFn, baseUrl = "" }: ApiServiceOptions = {}) {
    // Bind fetch to globalThis to avoid "Illegal invocation"
    this.fetchFn = fetchFn ?? ((input, init) => globalThis.fetch(input, init));
    // Normalize baseUrl (no trailing slash)
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  /** Generic request: builds URL, sets headers, checks response.ok */
  private async request<T>(
    path: string,
    init: Omit<RequestInit, "body"> & { body?: any; signal?: AbortSignal } = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await this.fetchFn(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...init,
      body: init.body != null ? JSON.stringify(init.body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, text);
    }

    return (await res.json()) as T;
  }

  // ——— Preference endpoints ——————————————————————————————

  /** GET  /api/preference */
  async getPreference(signal?: AbortSignal): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", { signal });
  }

  /** POST /api/preference */
  async createPreference(
    data: Omit<IPreference, "id">,
    signal?: AbortSignal
  ): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", {
      method: "POST",
      body: data,
      signal,
    });
  }

  /** PATCH /api/preference */
  async updatePreference(
    data: Partial<Omit<IPreference, "id">>,
    signal?: AbortSignal
  ): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", {
      method: "PATCH",
      body: data,
      signal,
    });
  }

  // ——— User endpoints ——————————————————————————————————

  /** GET  /api/user */
  async getUser(signal?: AbortSignal): Promise<IUser> {
    return this.request<IUser>("/api/user", { signal });
  }

  /** PATCH /api/user */
  async updateUser(
    data: Partial<Omit<IUser, "id">>,
    signal?: AbortSignal
  ): Promise<IUser> {
    return this.request<IUser>("/api/user", {
      method: "PATCH",
      body: data,
      signal,
    });
  }

  // ——— Daily Motivation endpoint ——————————————————————————————————

  /** GET /api/daily-motivation */
  async getDailyMotivation(signal?: AbortSignal): Promise<IMotivation> {
    return this.request<IMotivation>("/api/daily-motivation", { signal });
  }
}

export const apiService = new ApiService({});
