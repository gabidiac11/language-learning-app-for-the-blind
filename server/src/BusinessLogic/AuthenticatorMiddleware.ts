import Result from "../Controllers/Result";
import { Request } from "express";
import * as admin from "firebase-admin";
import { log } from "../logger";

export default class Authenticator {
  constructor() {}

  public async isAuth(req: Request): Promise<Result<string>> {
    const authHeader = req.headers.authorization;
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return Result.Error<string>("Unauthorized.", 401);
    }

    const token = authHeader.split(" ")[1];
    log("Trying to authenticate token");
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      log("Authenticating token succeeds with user id"+decodedToken.uid);
      return Result.Success(decodedToken.uid);
    } catch (error) {
      log(
        `Error occured while trying to authenticate ${token}: [${error?.message}]`
      );
      return Result.Error<string>("Unauthorised.", 401);
    }
  }
}
