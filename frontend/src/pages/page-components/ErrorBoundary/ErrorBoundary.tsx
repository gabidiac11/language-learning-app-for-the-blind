import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { apiErrorsAppMessages } from "../../../accessibility/staticAppMessages/apiErrorsAppMessages";
import { generalAppMessages } from "../../../accessibility/staticAppMessages/generalAppMessages";
import {
  PlayableError,
  PlayableMessage,
} from "../../../accessibility/types/playableMessage.type";
import { Loader, OverLayLoader } from "../Loader";

import "./ErrorBoundary.scss";

type ErrorBoundaryProps = {
  error: PlayableError | undefined;
  onRetry: () => void;
  children: React.ReactNode;
  loading: boolean;
  preserveChildren?: boolean;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error,
  loading,
  onRetry,
  children,
  preserveChildren,
}) => {
  useEffect(() => {
    error && console.error("PLAYABLE ERROR", error);
  }, [error]);

  if (loading && preserveChildren) {
    return (
      <>
        {children}
        <OverLayLoader />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={onRetry} />;
  }

  return <>{children}</>;
};

const ErrorDisplay = (props: { error: PlayableError; onRetry: () => void }) => {
  return (
    <div>
      <p>Operation failed.</p>
      
      {props.error.message.messages.map((item, index) => {
        return <p key={`${item.uniqueName}-${index}`}>{item.text}</p>;
      })}

      <div>
        <Button
          tabIndex={0}
          aria-label={`Button: Try again to fetch the request.`}
          onClick={props.onRetry}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
