/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CravingCreate,
  DiaryCreate,
  DiaryUpdate,
  IBadgeList,
  ICraving,
  ICravingList,
  IDiary,
  IDiaryList,
  IHealth,
  IMotivation,
  IPreference,
  IUser,
} from "./types";

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

const qs = (o: Record<string, unknown> = {}) => {
  const s = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") s.set(k, String(v));
  });
  const str = s.toString();
  return str ? `?${str}` : "";
};

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
    const hasBody = body !== undefined && body !== null;
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...(typeof initHeaders === "object" && !Array.isArray(initHeaders)
        ? initHeaders
        : {}),
    };
    if (hasBody) headers["Content-Type"] = "application/json";

    const res = await this.fetchFn(url, {
      ...restInit,
      headers,
      body: hasBody ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, text);
    }

    // handle 204 / empty bodies safely
    if (res.status === 204) return undefined as T;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) return undefined as T;

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

  // --- DIARY ---------------------------------------------------
  async getDiaries(
    params: { date?: string; skip?: number; limit?: number } = {},
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IDiaryList> {
    console.log("URL to next route ------ ", `/api/diary${qs(params)}`);
    return this.request<IDiaryList>(`/api/diary${qs(params)}`, {
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** GET /api/diary/:id */
  async getDiary(
    diaryId: number | string,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IDiary> {
    return this.request<IDiary>(`/api/diary/${diaryId}`, {
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** POST /api/diary */
  async createDiary(
    data: DiaryCreate,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IDiary> {
    return this.request<IDiary>("/api/diary", {
      method: "POST",
      body: data,
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** PATCH /api/diary/:id */
  async updateDiary(
    diaryId: number | string,
    data: DiaryUpdate,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IDiary> {
    return this.request<IDiary>(`/api/diary/${diaryId}`, {
      method: "PATCH",
      body: data,
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** DELETE /api/diary/:id */
  async deleteDiary(
    diaryId: number | string,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<void> {
    await this.request<void>(`/api/diary/${diaryId}`, {
      method: "DELETE",
      credentials: "include",
      ...(init ?? {}),
    });
  }
  // --- CRAVINGS ------------------------------------------------
  async getCravings(
    params: { day?: string; skip?: number; limit?: number } = {},
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<ICravingList> {
    return this.request<ICravingList>(`/api/cravings${qs(params)}`, {
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** GET /api/cravings/:id */
  async getCraving(
    cravingId: number | string,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<ICraving> {
    return this.request<ICraving>(`/api/cravings/${cravingId}`, {
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** POST /api/cravings */
  async createCraving(
    data: CravingCreate,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<ICraving> {
    return this.request<ICraving>("/api/cravings", {
      method: "POST",
      body: data,
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** PUT /api/cravings/:id */
  async updateCraving(
    cravingId: number | string,
    data: CravingCreate, // backend expects full payload
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<ICraving> {
    return this.request<ICraving>(`/api/cravings/${cravingId}`, {
      method: "PUT",
      body: data,
      credentials: "include",
      ...(init ?? {}),
    });
  }

  /** DELETE /api/cravings/:id */
  async deleteCraving(
    cravingId: number | string,
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<void> {
    await this.request<void>(`/api/cravings/${cravingId}`, {
      method: "DELETE",
      credentials: "include",
      ...(init ?? {}),
    });
  }

  // --- BADGES --------------------------------------------------
  async getMyBadges(
    params: { skip?: number; limit?: number } = {},
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IBadgeList> {
    return this.request<IBadgeList>(`/api/badges${qs(params)}`, {
      credentials: "include",
      ...(init ?? {}),
    });
  }

  // ---- HEALTH ----------------------------------------------
  /** GET /api/health */
  async getHealth(
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<IHealth> {
    return this.request<IHealth>("/api/health", init ?? {});
  }

  // AUTH
  async getAccessToken(
    init?: Omit<RequestInit, "body"> & {
      signal?: AbortSignal;
      headers?: Record<string, string>;
    }
  ): Promise<any> {
    return this.request<string>("/api/token", init ?? {});
  }
}

/**
 * Export a singleton for easy imports
 */
export const apiService = new ApiService();
