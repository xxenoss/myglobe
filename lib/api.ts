const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    let errorMsg = 'API request failed';
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMsg = errorData.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}
