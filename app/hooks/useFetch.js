import { useCallback, useEffect, useRef, useState } from 'react';

import api from '../api/axios';

const useFetch = (url, options = {}) => {
  const { enabled = true, initialData = null, requestConfig = {} } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(url && enabled));
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const requestConfigRef = useRef(requestConfig);

  useEffect(() => {
    requestConfigRef.current = requestConfig;
  }, [requestConfig]);

  const refetch = useCallback(
    async (overrideConfig = {}) => {
      if (!url) {
        setLoading(false);
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(url, {
          ...requestConfigRef.current,
          ...overrideConfig
        });

        if (mountedRef.current) {
          setData(response.data);
        }

        return response.data;
      } catch (fetchError) {
        if (mountedRef.current) {
          setError(fetchError);
        }

        return null;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [url]
  );

  useEffect(() => {
    mountedRef.current = true;

    if (enabled) {
      refetch();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [enabled, refetch]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

export default useFetch;
