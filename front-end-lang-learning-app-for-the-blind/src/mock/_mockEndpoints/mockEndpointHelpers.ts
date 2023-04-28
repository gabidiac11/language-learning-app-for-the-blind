import { AxiosRequestConfig } from "axios";

export function log(value: any, obj?: any) {
  if(obj) {
    console.log(`Mock: ${value}`, obj);
    return;
  }
  console.log(`Mock: ${value}`);
}

export async function withUser<T>(
  config: AxiosRequestConfig,
  callback: (userId: string, data?: T) => Promise<any[]>
) {
  const userId = config?.headers?.["user-id"] ?? "";
  if (!userId) {
    const failedAuthorisedResponse = await withLog(config, () =>
      Promise.resolve([401, { message: "User is not authorised." }])
    );
    return failedAuthorisedResponse;
  }

  let data: T;
  if (config.method?.toUpperCase() == "POST" && config.data) {
    data = JSON.parse(config.data) as T;
  }

  const authorisedLoggedResponse = await withLog(config, () =>
    callback(userId, data)
  );
  return authorisedLoggedResponse;
}

export async function withLog(
  config: AxiosRequestConfig,
  callback: () => Promise<any[]>
) {
  log(`Started ${config.method?.toUpperCase()} /${config.url}`);

  const response = await callback();

  const possibleErrorMessage =
    response[0] !== 200 && response[0] !== 201
      ? ` Message: '${response[1].message}'`
      : "";
  log(
    `Finished [${
      response[0]
    }]${possibleErrorMessage} at ${config.method?.toUpperCase()} /${config.url}`,
    response?.[1]
  );
  return response;
}

export function wait(miliseconds = 500) {
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({});
    }, miliseconds)
  );
}

export type Result<T> = {
  errors?: string[];
  errorStatusCode?: number;
  data?: T;
};

export const processResultOfT = <T>(result: Result<T>): any[] => {
  const status = result.errors ? result?.errorStatusCode ?? 400 : 200;
  if (status == 200) {
    return [200, result.data];
  }
  const message = result.errors?.join(",") ?? "Something went wrong";
  return [status, { message }];
};
