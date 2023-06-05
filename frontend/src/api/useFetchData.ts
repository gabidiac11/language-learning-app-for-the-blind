import { useState, useEffect, useCallback, useRef } from "react";
import { getPlayableErrorFromUnknown } from "../accessibility/apiAppMessages";
import { PlayableError, PlayableMessage } from "../accessibility/playableMessage";
import axiosInstance from "../axiosInstance";
import { lessonLanguageHeader } from "../constants";
import { playTextAudio } from "../utils";


const useFetchData = <T>(
  url: string,
  lang?: string,
  fetchOptions?: UseFetchDataOptions,
) => {
  const [data, setData] = useState<T>();
  const [dataWithHttpResponse, setDataWithHttpResponse] = useState<{
    data: T;
    httpInfo: { options?: UseFetchDataOptions; url: string };
  }>();
  const [, setLoadingKey] = useState<number>(0);
  const loadingRef = useRef<{ key: number; value: boolean }>({
    key: 0,
    value: true,
  });

  const [error, setError] = useState<PlayableError>();
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
      // TODO: play audio message when starts and ends request
      setLoading(true);
      const _fetchOptions = fetchOptions;
      const _url = url;
      const response = await computeAxiosPromise(fetchOptions, url, lang);
      setData(response.data);
      setError(undefined);
      setDataWithHttpResponse({
        data: response.data as T,
        httpInfo: {
          options: _fetchOptions,
          url: _url,
        },
      });
    } catch (error) {
      const playableError = getPlayableErrorFromUnknown(error);
      setError(playableError);
    } finally {
      playTextAudio("Loading finished.");
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

export type UseFetchDataOptions = {
  method: "GET" | "POST" | "PUT";
  body?: object;
};

function computeAxiosPromise(
  fetchOptions: UseFetchDataOptions | undefined,
  url: string,
  lang?: string
) {
  const config = {
    headers: {
      [lessonLanguageHeader]: lang,
    },
  };

  if (!fetchOptions) {
    return axiosInstance.get(url, config);
  }
  if (fetchOptions.method === "POST") {
    return axiosInstance.post(url, fetchOptions.body, config);
  }
  return axiosInstance.get(url, config);
};

export default useFetchData;
