const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type ApiInit = RequestInit & { json?: unknown };

export async function apiFetch(path: string, init: ApiInit = {}) {
  const { json, headers, ...rest } = init;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: json !== undefined ? JSON.stringify(json) : init.body,
    ...rest,
  });

  // Option: lève sur 401/403/etc. pour centraliser le handling
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    const error = new Error(text || `HTTP ${response.status}`);
    // @ts-expect-error - enrichi
    error.status = response.status;
    throw error;
  }

  // Tente de parser JSON si possible
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}