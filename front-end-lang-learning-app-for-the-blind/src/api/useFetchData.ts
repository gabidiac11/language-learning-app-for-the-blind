import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../axiosInstance";

export type UseFetchDataOptions = {
  method: "GET" | "POST" | "PUT";
  body?: object;
};

const computeAxiosPromise = (
  fetchOptions: UseFetchDataOptions | undefined,
  url: string
) => {
  if (!fetchOptions) {
    return axiosInstance.get(url);
  }
  if (fetchOptions.method === "POST") {
    return axiosInstance.post(url, fetchOptions.body);
  }
  return axiosInstance.get(url);
};

const useFetchData = <T>(url: string, fetchOptions?: UseFetchDataOptions) => {
  const [data, setData] = useState<T>();
  const [dataWithHttpResponse, setDataWithHttpResponse] = useState<{
    data: T;
    httpInfo: { options?: UseFetchDataOptions };
  }>();
  const [, setLoadingKey] = useState<number>(0);
  const loadingRef = useRef<{ key: number; value: boolean }>({
    key: 0,
    value: true,
  });

  const [error, setError] = useState<unknown>(null);
  const [retryFlag, setRetryFlag] = useState<number>();

  const urlRef = useRef<string>();
  const optionsRef = useRef<UseFetchDataOptions>();

  const setLoading = useCallback((value: boolean) => {
    loadingRef.current.value = value;
    loadingRef.current.key++;
    setLoadingKey(loadingRef.current.key); //only forces a new rendering
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const _fetchOptions = fetchOptions;

      const response = await computeAxiosPromise(fetchOptions, url);
      setData(response.data);
      setError(undefined);
      setDataWithHttpResponse({
        data: response.data as T,
        httpInfo: {
          options: _fetchOptions,
        },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, fetchOptions]);

  const retry = useCallback(
    () => setRetryFlag((retryFlag ?? 0) + 1),
    [retryFlag]
  );

  useEffect(() => {
    // some mental stuff happens that react is firing this twice for no reason
    if (urlRef.current != url || optionsRef.current !== fetchOptions) {
      urlRef.current = url;
      optionsRef.current = fetchOptions;
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (!retryFlag) {
      // TODO: BUG -> it seems that this retry doesn't actually work!!!! test case 400 -> 200 (doesn't show results)
      return;
    }
    fetchData();
  }, [retryFlag, fetchData]);

  return {
    data,
    dataWithHttpResponse,
    loading: loadingRef.current.value,
    error,
    retry,
  };
};

export default useFetchData;
