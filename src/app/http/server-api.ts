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
  get: (url: string, options?: any) => serverApiClient.get(url, options),
  post: (url: string, options?: any) => serverApiClient.post(url, options),
  put: (url: string, options?: any) => serverApiClient.put(url, options),
  patch: (url: string, options?: any) => serverApiClient.patch(url, options),
  delete: (url: string, options?: any) => serverApiClient.delete(url, options),
};
