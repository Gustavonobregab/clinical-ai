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
  get: (url: string, options?: any) => apiClient.get(url, options),
  post: (url: string, options?: any) => apiClient.post(url, options),
  put: (url: string, options?: any) => apiClient.put(url, options),
  patch: (url: string, options?: any) => apiClient.patch(url, options),
  delete: (url: string, options?: any) => apiClient.delete(url, options),
};
