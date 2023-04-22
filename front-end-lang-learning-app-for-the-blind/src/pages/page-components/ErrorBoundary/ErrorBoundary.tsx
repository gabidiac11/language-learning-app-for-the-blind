import { Button } from "@mui/material";
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

  if(loading) {
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

// TODO: add some @mui materials here for a prettier look
const DefaultDisplayedApiError = (props: { error: unknown }) => {
  const errorWithMessage = props.error as { message?: string };
  console.log(typeof props.error, "type of error");
  return (
    <div>
      <p>Operation failed</p>
      <p>{errorWithMessage?.message && errorWithMessage.message}</p>
    </div>
  );
};

export default ErrorBoundary;
