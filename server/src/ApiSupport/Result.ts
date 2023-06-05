import { ApiMessage } from "./appErrorMessage";

export default class Result<T> {
  public data?: T;
  public errors?: ApiMessage[];
  public statusCode?: number;
  // NOTE: update getCopy when adding new properties

  public getCopy<T2>(): Result<T2> {
    const newResult = new Result<T2>();
    newResult.errors = this.errors;
    newResult.statusCode = this.statusCode;
    return newResult;
  }

  public isError(): boolean {
    return !!this.errors;
  }

  public static Error<T>(message: ApiMessage, statusCode?: number) {
    const result = new Result<T>();
    result.errors = [message];
    result.statusCode = statusCode;
    return result;
  }

  public static Errors<T>(messages: ApiMessage[], statusCode?: number) {
    const result = new Result<T>();
    result.errors = messages;
    result.statusCode = statusCode;
    return result;
  }

  public static Success<T>(data: T, statusCode?: number) {
    const result = new Result<T>();
    result.data = data;
    result.statusCode = statusCode;
    return result;
  }

  public As<T2>() {
    const resultNew = new Result<T2>();
    resultNew.errors = this.errors;
    resultNew.statusCode = this.statusCode;
    return resultNew;
  }
}
