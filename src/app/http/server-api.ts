import ky from 'ky';

export const serverApiClient = ky.create({
  prefixUrl: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  throwHttpErrors: true,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status >= 500) {
          console.error('Server error in API call:', response.status, response.statusText);
        }
        
        return response;
      },
    ],
  },
});

export const serverApi = {
  get: (url: string, options?: RequestInit) => serverApiClient.get(url, options),
  post: (url: string, options?: RequestInit) => serverApiClient.post(url, options),
  put: (url: string, options?: RequestInit) => serverApiClient.put(url, options),
  patch: (url: string, options?: RequestInit) => serverApiClient.patch(url, options),
  delete: (url: string, options?: RequestInit) => serverApiClient.delete(url, options),
};
