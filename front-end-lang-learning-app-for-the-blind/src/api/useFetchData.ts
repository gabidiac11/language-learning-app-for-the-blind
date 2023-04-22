import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../axiosInstance";

export type UseFetchDataOptions = {
  method: "GET" | "POST" | "PUT";
  body?: object;
};

const withDelayIfDemoEnv = (originalPromise: Promise<any>) => {
  // TODO: make this dynamic
  const isDemoEnv = true;
  if(!isDemoEnv) {
    return originalPromise;
  }

  const newPromise = new Promise((resolve) => setTimeout(() => {
    resolve(originalPromise);
  }, 500));
  return newPromise;
}

const useFetchData = <T>(url: string, fetchOptions?: UseFetchDataOptions) => {
  const [data, setData] = useState<T>();
  const [, setLoadingKey] = useState<number>(0);
  const loadingRef = useRef<{key: number, value:boolean}>({key:0, value: true});

  const [error, setError] = useState<unknown>(null);
  const [retryFlag, setRetryFlag] = useState<number>();

  const urlRef = useRef<string>();

  const setLoading = useCallback((value: boolean) => {
    loadingRef.current.value = value;
    loadingRef.current.key++;
    setLoadingKey(loadingRef.current.key); //only forces a new rendering
  }, []);

  const fetchData = useCallback(async () => {
    const computeAxiosPromise = () => {
      if (!fetchOptions) {
        return axiosInstance.get(url);
      }
      if (fetchOptions.method === "POST") {
        return axiosInstance.post(url, fetchOptions.body);
      }
      return axiosInstance.get(url);
    };

    try {
      setLoading(true);
      const response = await withDelayIfDemoEnv(computeAxiosPromise());
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, fetchOptions]);

  const retry = useCallback(() => setRetryFlag((retryFlag ?? 0) + 1), [retryFlag]);

  useEffect(() => {
    // some mental stuff happens that react is firing this twice for no reason
    if (urlRef.current != url) {
      urlRef.current = url;
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (!retryFlag) {
      return;
    }
    fetchData();
  }, [retryFlag, fetchData]);

  return { data, loading: loadingRef.current.value, error, retry };
};

export default useFetchData;
