export type ApiMessage = {
  text: string;
  filePath: string;
  uniqueName: string;
};

export type ApiErrorResponseData = {
  messages: ApiMessage[];
  isApiErrorResponseData: true;
};
