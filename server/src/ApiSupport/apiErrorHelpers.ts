import Result from "./Result";

/**
 * creates a message consisting of a shallow representation of error object to avoid serialization errors (circular stuff)
 * @param error
 * @returns
 */
export function getErrorLogMessage(error: unknown, prefix?: string) {
  let stringifiedError = "";
  if (error && typeof error === "object") {
    stringifiedError = Object.entries(error)
      .map((curr) => {
        const [key, value] = curr;
        return `[${key}:${value}]`;
      })
      .join(",");
  }
  if (error && typeof error !== "object") {
    stringifiedError = String(error);
  }

  const message = `${prefix ?? ""}Error occured ${
    (error as { message?: string })?.message ?? "Something went wrong."
  }. Entries: ${stringifiedError}`;
  return message;
}

export type ApiError<T> = {
  result: Result<T>;
  isThisApiError: true;
};
