'use client';

import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  cache: 'no-store',
  timeout: 30000,
  throwHttpErrors: true,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status >= 500) {
          console.error('Server error:', response.status, response.statusText);
        }
        
        return response;
      },
    ],
  },
});

export const api = {
  get: (url: string, options?: RequestInit) => apiClient.get(url, options),
  post: (url: string, options?: RequestInit) => apiClient.post(url, options),
  put: (url: string, options?: RequestInit) => apiClient.put(url, options),
  patch: (url: string, options?: RequestInit) => apiClient.patch(url, options),
  delete: (url: string, options?: RequestInit) => apiClient.delete(url, options),
};
