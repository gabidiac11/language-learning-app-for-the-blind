import React, { useEffect } from "react";

import "./ErrorBoundary.scss";

type ErrorBoundaryProps = {
  error: unknown | Error | undefined;
  onRetry: () => void;
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error,
  onRetry,
  children,
}) => {
  
  useEffect(() => {
    error && console.error(error);
  }, [error]);

  if (error) {
    return (
      <div>
        <p>Operation failed</p>
        <button onClick={onRetry}>Try again</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
