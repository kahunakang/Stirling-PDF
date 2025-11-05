import { AxiosInstance } from 'axios';

function readXsrfToken(): string | undefined {
  const match = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('XSRF-TOKEN='));

  return match ? decodeURIComponent(match.substring('XSRF-TOKEN='.length)) : undefined;
}

export function setupApiInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    const token = readXsrfToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
  });
}
