import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [retryFlag, setRetryFlag] = useState<number>();

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
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!retryFlag) {
      return;
    }
    fetchData();
  }, [retryFlag]);

  return { data, loading, error, retry };
};

export default useFetchData;
