/* eslint-disable @typescript-eslint/no-explicit-any */
// services/apiService.ts

import { IMotivation, IPreference, IUser } from "./types";

/**
 * Typed error for non-2xx responses
 */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface ApiServiceOptions {
  fetchFn?: FetchFn;
  baseUrl?: string;
}

export class ApiService {
  private fetchFn: FetchFn;
  private baseUrl: string;

  constructor({ fetchFn, baseUrl }: ApiServiceOptions = {}) {
    // Bind fetch to globalThis to avoid "Illegal invocation"
    this.fetchFn = fetchFn ?? ((input, init) => globalThis.fetch(input, init));

    // Determine base URL: use provided or fallback to NEXT_PUBLIC_BASE_URL
    const envApiBase = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const rawBase = baseUrl !== undefined ? baseUrl : envApiBase;

    // Normalize baseUrl (no trailing slash)
    this.baseUrl = rawBase.replace(/\/+$/, "");
  }

  /**
   * Generic request: builds absolute URL, sets headers, checks response.ok
   */
  private async request<T>(
    path: string,
    init: Omit<RequestInit, "body"> & {
      body?: any;
      signal?: AbortSignal;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    // Build absolute URL if baseUrl is set, otherwise path
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
    const { body, headers: initHeaders, ...restInit } = init;

    const res = await this.fetchFn(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...initHeaders,
      },
      ...restInit,
      body: body != null ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, text);
    }

    return (await res.json()) as T;
  }

  // ——— Preference endpoints ——————————————————————————————

  /** GET  /api/preference */
  async getPreference(
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", init ?? {});
  }

  /** POST /api/preference */
  async createPreference(
    data: Omit<IPreference, "id">,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", {
      method: "POST",
      body: data,
      ...(init ?? {}),
    });
  }

  /** PATCH /api/preference */
  async updatePreference(
    data: Partial<Omit<IPreference, "id">>,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IPreference> {
    return this.request<IPreference>("/api/preference", {
      method: "PATCH",
      body: data,
      ...(init ?? {}),
    });
  }

  // ——— User endpoints ——————————————————————————————————

  /** GET  /api/user */
  async getUser(
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IUser> {
    return this.request<IUser>("/api/user", init ?? {});
  }

  /** PATCH /api/user */
  async updateUser(
    data: Partial<Omit<IUser, "id">>,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IUser> {
    return this.request<IUser>("/api/user", {
      method: "PATCH",
      body: data,
      ...(init ?? {}),
    });
  }

  // ——— Daily Motivation endpoint ——————————————————————————————————

  /** GET /api/daily-motivation */
  async getDailyMotivation(
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IMotivation> {
    return this.request<IMotivation>("/api/daily-motivation", init ?? {});
  }
}

/**
 * Export a singleton for easy imports
 */
export const apiService = new ApiService();
