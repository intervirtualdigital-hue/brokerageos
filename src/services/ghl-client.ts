/**
 * GoHighLevel API v2 — Centralized HTTP Client
 *
 * All requests are routed through `/api/ghl` which is proxied by Vite dev
 * server to `https://services.leadconnectorhq.com`. This keeps the API key
 * out of the browser bundle and avoids CORS issues.
 */

const BASE = '/api/ghl';
const API_VERSION = '2021-07-28';

interface GHLRequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(
  method: string,
  path: string,
  opts: GHLRequestOptions = {},
  retries = 2,
): Promise<T> {
  const url = new URL(`${BASE}${path}`, window.location.origin);
  if (opts.params) {
    Object.entries(opts.params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
    });
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Version: API_VERSION,
        ...opts.headers,
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });

    if (!res.ok) {
      const errBody = await res.text();
      // Fallback handling: Retry on server errors
      if (res.status >= 500 && retries > 0) {
        console.warn(`[GHL] ${res.status} error, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, 1000));
        return request(method, path, opts, retries - 1);
      }
      console.error(`[GHL] ${method} ${path} → ${res.status}`, errBody);
      throw new GHLError(res.status, errBody, path);
    }

    if (res.status === 204) return {} as T;
    return res.json() as Promise<T>;
    
  } catch (err) {
    // Fallback handling: Retry on generic network failures
    if (err instanceof TypeError && retries > 0) {
      console.warn(`[GHL] Network Error, retrying... (${retries} left)`);
      await new Promise(r => setTimeout(r, 1000));
      return request(method, path, opts, retries - 1);
    }
    throw err;
  }
}

/** Typed convenience helpers */
export const ghl = {
  get: <T>(path: string, params?: GHLRequestOptions['params']) =>
    request<T>('GET', path, { params }),

  post: <T>(path: string, body?: unknown, params?: GHLRequestOptions['params']) =>
    request<T>('POST', path, { body, params }),

  put: <T>(path: string, body?: unknown) =>
    request<T>('PUT', path, { body }),

  delete: <T>(path: string) =>
    request<T>('DELETE', path),
};

/** Structured error for UI consumption */
export class GHLError extends Error {
  constructor(
    public status: number,
    public body: string,
    public path: string,
  ) {
    super(`GHL API ${status}: ${path}`);
    this.name = 'GHLError';
  }
}
