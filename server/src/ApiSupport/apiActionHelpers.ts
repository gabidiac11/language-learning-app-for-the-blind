import Result from "./Result";
import { log } from "../logger";
import { Response, Request } from "express";
import { ApiErrorResponse, getErrorLogMessage } from "./apiErrorHelpers";
import BaseController from "../Controllers/BaseController";
import { Injector } from "boxed-injector";
import { LanguageProvider } from "../BusinessLogic/LanguageProvider";

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

export async function executeAuthenticatedAction<T>(
  { req, res, controller, DI }: { req: Request; res: Response, controller: BaseController, DI: Injector },
  callbackAsync: () => Promise<T>
) {
  try {
    const languageProvider = DI.get(LanguageProvider.name) as LanguageProvider;
    if(languageProvider.language === undefined) {
      throw ApiErrorResponse.BadRequest("Language is not set.");
    }
    await controller.authenticateAsync(req);
    const data = await callbackAsync();
    return processResultOfT<T>(Result.Success<T>(data), req, res);
  } catch (error) {
    const apiError = error as ApiErrorResponse<T>;
    if (apiError?.isThisApiError) {
      const loggableMessage = getErrorLogMessage(apiError.result.errors);
      log(loggableMessage);
      return processResultOfT<T>(apiError.result, req, res);
    }

    const loggableMessage = getErrorLogMessage(error);
    log(loggableMessage);
    const result = Result.Error<T>("Something went wrong.", 500);
    return processResultOfT<T>(result, req, res);
  }
}
