import Result from "./Result";

export function getStringifiedError(
  error: unknown,
  _maxLevel?: number,
  _level?: number
): string {
  const maxLevel = _maxLevel ?? 0;
  const level = _level ?? 0;

  let stringifiedError = "";
  if (error && typeof error === "object") {
    stringifiedError = Object.entries(error)
      .map((curr) => {
        const [key, value] = curr;
        // TODO: test this stuff
        if (level < maxLevel) {
          const stringifiedSubValue = getStringifiedError(
            value,
            maxLevel,
            level + 1
          );
          return `[${key}:${stringifiedSubValue}]`;
        }
        return `[${key}:${value}]`;
      })
      .join(",");
  }
  if (error && typeof error !== "object") {
    stringifiedError = String(error);
  }
  return stringifiedError;
}

/**
 * creates a message consisting of a shallow representation of error object to avoid serialization errors (circular stuff)
 * @param error
 * @returns
 */
export function getErrorLogMessage(error: unknown, prefix?: string) {
  const stringifiedError = getStringifiedError(error, 3);

  const message = `${prefix ?? ""}Error occured ${
    (error as { message?: string })?.message ?? "Something went wrong."
  }. Entries: ${stringifiedError}`;
  return message;
}

// TODO: search where is thrown and make sure:
// log 500 errors and make sure the user doesn't see those
// make sure technical errors are logged and not returned to the user
export class ApiErrorResponse<T> {
  public isThisApiError = true;
  public result: Result<T>;

  public static Error<T>(userMessage: string, code?: number): ApiErrorResponse<T> {
    const apiError = new ApiErrorResponse<T>();
    apiError.result = new Result<T>();
    apiError.result.statusCode = code;
    apiError.result.errors = [userMessage];

    return apiError;
  }

  public static NotFound<T>(): ApiErrorResponse<T> {
    const notFoundError = new ApiErrorResponse<T>();
    notFoundError.result = new Result<T>();
    notFoundError.result.statusCode = 404;
    notFoundError.result.errors = ["Not found."];

    return notFoundError;
  }

  public static InternalError<T>(): ApiErrorResponse<T> {
    const notFoundError = new ApiErrorResponse<T>();
    notFoundError.result = new Result<T>();
    notFoundError.result.statusCode = 500;
    notFoundError.result.errors = ["Something went wrong."];

    return notFoundError;
  }

  public static Forbidden<T>(userMessage: string): ApiErrorResponse<T> {
    const apiError = new ApiErrorResponse<T>();
    apiError.result = new Result<T>();
    apiError.result.statusCode = 403;
    apiError.result.errors = [userMessage];

    return apiError;
  }

  public static BadRequest<T>(userMessage: string): ApiErrorResponse<T> {
    const apiError = new ApiErrorResponse<T>();
    apiError.result = new Result<T>();
    apiError.result.statusCode = 400;
    apiError.result.errors = [userMessage];

    return apiError;
  }

  public static ErrorResult<T>(result: Result<T>): ApiErrorResponse<T> {
    const apiError = new ApiErrorResponse<T>();
    apiError.result = result;

    return apiError;
  }

  public static IsApiError(error: unknown) {
    return (error as ApiErrorResponse<any>)?.isThisApiError === true;
  }
}
