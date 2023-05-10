import Result from "./Result";
import { log } from "../logger";
import { Response, Request } from "express";
import { ApiError, getErrorLogMessage } from "./apiErrorHelpers";

export function processResultOfT<T>(
  result: Result<T>,
  req: Request,
  res: Response
) {
  let statusCode = 0;
  let data: unknown;

  if (result.isError()) {
    statusCode = result.statusCode ?? 400;
    data = result.errors
      ? { messages: result.errors }
      : { messages: ["Something went wrong."] };
  } else {
    statusCode = result.statusCode ?? 200;
    data = result.data ?? {};
  }

  log(
    `Finished [${statusCode}] at [${req.url}] with result ${JSON.stringify(
      data
    ).slice(0, 100)}`
  );
  return res.status(statusCode).send(data);
}

export async function executeActionAsync<T>(
  { req, res }: { req: Request; res: Response },
  callbackAsync: (req: Request) => Promise<Result<T>>
) {
  try {
    const result = await callbackAsync(req);
    return processResultOfT<T>(result, req, res);
  } catch (error) {
    const loggableMessage = getErrorLogMessage(error);
    log(loggableMessage);

    const apiError = error as ApiError<T>;
    if (apiError?.isThisApiError) {
      return processResultOfT<T>(apiError.result, req, res);
    }

    const result = Result.Error<T>("Something went wrong.");
    return processResultOfT<T>(result, req, res);
  }
}
