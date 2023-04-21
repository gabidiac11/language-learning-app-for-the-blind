import { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "../axiosInstance";

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [retryFlag, setRetryFlag] = useState<number>();

  const urlRef = useRef<string>();

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const retry = useCallback(() => setRetryFlag((retryFlag ?? 0) + 1), []);

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

  return { data, loading, error, retry };
};

export default useFetchData;
