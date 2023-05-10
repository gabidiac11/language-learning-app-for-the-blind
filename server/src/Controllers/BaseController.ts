import { AppUser, Authenticator } from "../ApiSupport/authentication";
import { Request } from "express";
import { ApiError } from "../ApiSupport/apiErrorHelpers";

export default class BaseController {
  private _user?: AppUser;
  private _authenticator: Authenticator;
  constructor(authenticator: Authenticator) {
    this._authenticator = authenticator;
  }

  protected async authenticateAsync<T>(req: Request) {
    const authResult = await this._authenticator.getAuthUserFromReq(req);
    if (!authResult.isError()) {
      this._user = authResult.data;
      return;
    }
    throw ApiError.ErrorResult(authResult.As<T>());
  }

  protected getUser(): AppUser {
    if (!this._user) {
      throw "Controller accessed 'User' while not doing prior authentication.";
    }
    return this._user;
  }

  protected getParam<T>(req: Request, key: string): string {
    const value = req.params?.[key];
    if (!value) {
      throw ApiError.Error<T>(`Request parameter ${key} should not be null.`, 400);
    }

    return value;
  }
}
