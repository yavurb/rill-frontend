import qs from 'qs';
import fetch from 'node-fetch';

interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query = {},
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  let url = `${import.meta.env.BACKEND_URL}/${endpoint}`;

  if (query) {
    url += `?${qs.stringify(query)}`;
  }


  const res = await fetch(url)
  let data: any = await res.json();


  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
