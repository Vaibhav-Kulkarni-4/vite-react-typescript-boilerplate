type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions<TBody = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody; // For POST method, use body
  queryParams?: Record<string, string | number | boolean>; // For GET method, use queryParams
  timeoutMs?: number;
}

export async function apiClientRequest<TResponse = any, TBody = any>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = "GET",
    headers = {},
    body,
    queryParams,
    timeoutMs = 10000,
  } = options;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Append query params if provided
  let finalUrl = BASE_URL + endpoint;
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    ).toString();
    finalUrl += `?${queryString}`;
  }

  // Timeout setup
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(finalUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // If the response status is not OK (2xx), throw an error
    if (!response.ok) {
      let errorDetails: any = {};
      try {
        errorDetails = await response.json();
      } catch {
        throw new Error(
          `HTTP ${response.status} - ${response.statusText}: ${JSON.stringify(
            errorDetails
          )}`
        );
      }
    }

    // Try to parse JSON, but allow non-JSON responses
    try {
      return (await response.json()) as TResponse;
    } catch {
      return (await response.text()) as unknown as TResponse;
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw new Error(error);
  }
}
