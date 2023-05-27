import Result from "./Result";
import { Request } from "express";
import * as admin from "firebase-admin";
import { log } from "../logger";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { getErrorLogMessage } from "./apiErrorHelpers";

export class Authenticator {
  constructor() {}

  public async getAuthUserFromReq(req: Request): Promise<Result<AppUser>> {
    console.log({hhh: req.headers})
    const authHeader = req.headers.authorization;
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return Result.Error<AppUser>("Unauthorized.", 401);
    }

    const token = authHeader.split(" ")[1];
    log("Trying to authenticate token");
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (!decodedToken?.uid)
        throw "Empty used result from authentication API.";

      log(
        `Authenticating token succeeds for user [uid: ${decodedToken.uid}, name: ${decodedToken.email}]`
      );
      return Result.Success(decodedToken);
    } catch (error) {
      const message = getErrorLogMessage(
        error,
        "[Error occured while trying to authenticate ${token}]:"
      );
      log(message);

      return Result.Error<AppUser>("Unauthorised.", 401);
    }
  }
}

export interface AppUser extends DecodedIdToken {
  email?: string;
  iss: string;
  phone_number?: string;
  picture?: string;
  uid: string;
}
