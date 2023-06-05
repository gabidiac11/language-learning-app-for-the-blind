import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { errorAppMessages } from "../../../accessibility/errorAppMessages";
import { generalAppMessages } from "../../../accessibility/generalAppMessages";
import {
  PlayableError,
  PlayableMessage,
} from "../../../accessibility/playableMessage";
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

// TODO: add some @mui materials here for a prettier look
const ErrorDisplay = (props: { error: PlayableError; onRetry: () => void }) => {
  return (
    <div>
      <p>{errorAppMessages.operationFailed.text}</p>
      
      {props.error.message.messages.map((item, index) => {
        return <p key={`${item.uniqueName}-${index}`}>{item.text}</p>;
      })}

      <div>
        <Button
          tabIndex={0}
          aria-label={generalAppMessages.tryAgainFetchRequest.text}
          onClick={props.onRetry}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
