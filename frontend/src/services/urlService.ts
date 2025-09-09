// src/services/urlService.ts

const apiUrl = import.meta.env.VITE_API_URL;

export interface Url {
  _id: string;
  name?: string;
  longUrl: string;
  shortCode: string;
  clickCount: number; // 👈 Change from clicks to clickCount
  expiresAt?: string;
}

export const getUserUrls = async (): Promise<Url[]> => {
  const res = await fetch(`${apiUrl}/api/url/`, {
    credentials: 'include', //incudes cookies
  });
  if (!res.ok) {
    throw new Error('Failed to fetch URLs');
  }
  return res.json();
};

export interface CreateUrlPayload {
  longUrl: string;
  name?: string;
  expiresAt?: string | null;
}

export const createShortUrl = async (payload: CreateUrlPayload): Promise<any> => {
  const res = await fetch(`${apiUrl}/api/url/createShortUrl`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create short URL');
  }
  return res.json();
};

export const deleteUrl = async (id: string): Promise<any> => {
  const res = await fetch(`${apiUrl}/api/url/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to delete URL');
  }
  return res.json();
};