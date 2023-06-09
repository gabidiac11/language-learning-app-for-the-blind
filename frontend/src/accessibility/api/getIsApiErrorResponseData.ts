import { ApiErrorResponseData } from "../types/apiMessage.type";


export function getIsApiErrorResponseData(obj: unknown): boolean {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const objAsAppMessage = obj as ApiErrorResponseData;
  return !!objAsAppMessage.isApiErrorResponseData;
}
