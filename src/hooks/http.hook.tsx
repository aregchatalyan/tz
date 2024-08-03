import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  const request = useCallback(async <T, >(url: string, init: RequestInit = {}) => {
    setLoading(true);

    if (init.body) {
      init.body = JSON.stringify(init.body);
      init.headers = {
        'Content-Type': 'application/json',
        ...init.headers
      }
    }

    try {
      const response = await fetch(url, init);
      const data = await response.json() ;

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong...');
      }

      setLoading(false);

      return data as T;
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setLoading(false);
    }
  }, []);

  return { request, loading, error }
}
