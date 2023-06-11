import Result from "./Result";
import { log } from "../logger";
import { Response, Request } from "express";
import { ApiErrorResponse, getErrorLogMessage } from "./apiErrorHelpers";
import BaseController from "../Controllers/BaseController";
import { Injector } from "boxed-injector";
import { LanguageProvider } from "../BusinessLogic/LanguageProvider";
import { ApiMessage } from "./appErrorMessage";
import { apiMessages } from "./apiMessages";

type ApiErrorResponseData = {
  messages: ApiMessage[],
  isApiErrorResponseData: true
}

export function processResultOfT<T>(
  result: Result<T>,
  req: Request,
  res: Response
) {
  let statusCode = 0;
  let data: ApiErrorResponseData | T | undefined;

  if (result.isError()) {
    statusCode = result.statusCode ?? 500;
    data =
      result.errors && result.errors?.length
        ? { messages: result.errors, isApiErrorResponseData: true }
        : { messages: [apiMessages.somethingWentWrong], isApiErrorResponseData: true };
  } else {
    statusCode = result.statusCode ?? 200;
    data = result.data ?? ({} as T);
  }

  // NOTE: be wary this doesn't account for circular structure (although for errors this is handled externally)
  const resultLoggable = JSON.stringify(
    data
  ).slice(0, 300);
  log(
    `Finished [${statusCode}] at [${req.url}] with result ${resultLoggable}`
  );

  return res.status(statusCode).send(data);
}

export async function executeAuthenticatedAction<T>(
  {
    req,
    res,
    controller,
    DI,
  }: { req: Request; res: Response; controller: BaseController; DI: Injector },
  callbackAsync: () => Promise<T>
) {
  try {
    // verify language header is provided
    const languageProvider = DI.get(LanguageProvider.name) as LanguageProvider;
    if (languageProvider.language === undefined) {
      throw ApiErrorResponse.BadRequest(apiMessages.languageNotSet);
    }

    // authenticate the request
    await controller.authenticateAsync(req);

    // call the controller action
    const data = await callbackAsync();
    return processResultOfT<T>(Result.Success<T>(data), req, res);
  } catch (error) {
    // process the shortcircuit api responses
    const apiError = error as ApiErrorResponse<T>;
    if (apiError?.isThisApiError) {
      const loggableMessage = getErrorLogMessage(apiError.result.errors);
      log(loggableMessage);

      return processResultOfT<T>(apiError.result, req, res);
    }

    // process 500 errors
    const loggableMessage = getErrorLogMessage(error);
    log(loggableMessage);
    const result = Result.Error<T>(apiMessages.somethingWentWrong, 500);
    return processResultOfT<T>(result, req, res);
  }
}
