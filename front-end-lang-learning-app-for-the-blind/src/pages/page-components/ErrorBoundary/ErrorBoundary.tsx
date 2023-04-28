import { Button } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Loader } from "../Loader";

import "./ErrorBoundary.scss";

type ErrorBoundaryProps = {
  error: unknown | Error | undefined;
  onRetry: () => void;
  children: React.ReactNode;
  displayedError?: string | React.ReactNode;
  loading: boolean;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error,
  loading,
  onRetry,
  children,
  displayedError,
}) => {
  useEffect(() => {
    error && console.error(error);
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    // TODO: add some @mui materials here for a prettier look
    return (
      <div>
        {/* TODO: [update displayedError should do the trick- should be added externally] think about hadling error code, for example if the user is not allowed to access something and should be informated, logging him out in some cases */}
        {/* TODO:  test this out if work everywhere it's being used*/}
        <>
          {(() => {
            if (!error) {
              return "";
            }
            return displayedError ?? <DefaultDisplayedApiError error={error} />;
          })()}
        </>
        <div>
          <Button onClick={onRetry}>Try again</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const getErrorToString = (error: unknown) => {
  if (!error) {
    return null;
  }
  const errorAsAxios = error as AxiosError;
  if (errorAsAxios?.isAxiosError) {
    const responseErrorMessage =
      (errorAsAxios.response?.data as { message?: string })?.message ?? "";

    const message = (
      <p>
        {errorAsAxios.message}
        {responseErrorMessage ? ":" : ""}
        {responseErrorMessage && <><br></br>{responseErrorMessage}</>}
      </p>
    );
    return message;
  }

  const errorMessage = (error as { message?: string })?.message;
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }
  return null;
};

// TODO: add some @mui materials here for a prettier look
const DefaultDisplayedApiError = (props: { error: unknown }) => {
  const errorMessage = getErrorToString(props.error);
  console.log(typeof props.error, "type of error");
  return (
    <div>
      <p>Operation failed</p>
      {errorMessage && errorMessage}
    </div>
  );
};

export default ErrorBoundary;
