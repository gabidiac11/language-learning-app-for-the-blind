import { AppUser, Authenticator } from "../ApiSupport/authentication";
import { Request } from "express";
import { ApiErrorResponse } from "../ApiSupport/apiErrorHelpers";
import Result from "../ApiSupport/Result";

export default class BaseController {
  private _user?: AppUser;
  private _authenticator: Authenticator;
  constructor(authenticator: Authenticator) {
    this._authenticator = authenticator;
  }

  public async authenticateAsync<T>(req: Request) {
    const authResult = await this._authenticator.getAuthUserFromReq(req);
    if (!authResult.isError()) {
      this._user = authResult.data;
      return;
    }
    throw ApiErrorResponse.ErrorResult(authResult.As<T>());
  }

  protected getUser(): AppUser {
    if (!this._user) {
      throw "Controller accessed 'User' while not doing prior authentication.";
    }
    return this._user;
  }

  private getParam<T>(req: Request, key: string): string {
    const value = req.params?.[key];
    if (!value) {
      throw ApiErrorResponse.BadRequest<T>(
        `Request parameter ${key} should not be null.`
      );
    }

    return value;
  }

  public getParams<T>(req: Request, keys: string[]): string[] {
    const values: string[] = [];
    for (const key of keys) {
      const value = this.getParam<T>(req, key);
      values.push(value);
    }
    return values;
  }

  protected processResult<T>(outputResult: Result<T>): T {
    if (outputResult.isError())
      throw ApiErrorResponse.ErrorResult(outputResult);
    return outputResult.data;
  }
}
