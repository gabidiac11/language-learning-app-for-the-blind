import path from "path";
import fs from "fs";
import { getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import { cloudCredentialsJson, cloudCredentailsFilePath } from "../constants";

export class CloudCredentials {
  private static instance: CloudCredentials;
  public static getInstance(): CloudCredentials {
    if (CloudCredentials.instance) {
      return CloudCredentials.instance;
    }

    CloudCredentials.instance = new CloudCredentials();
    return CloudCredentials.instance;
  }

  private _credentials: object = null;

  private constructor() {}

  public async getCredentials(): Promise<object> {
    if (this._credentials) {
      return this._credentials;
    }

    if (cloudCredentialsJson) {
      const credentials = JSON.parse(cloudCredentialsJson);
      if (credentials) {
        this._credentials = credentials;
        return credentials;
      }
    }

    if (cloudCredentailsFilePath) {
      const json = await this.readLocalJson();
      const credentials = JSON.parse(json);
      if (credentials) {
        this._credentials = credentials;
        return credentials;
      }
    }
    return {};
  }

  private readLocalJson(): string {
    try {
      // Read the JSON credentials file as a buffer
      const json = fs.readFileSync(cloudCredentailsFilePath, "utf-8");
      return json;
    } catch (err) {
      throw `[CloudCredentials]: Error while reading json ${cloudCredentailsFilePath} from local ${getStringifiedError(
        err
      )}`;
    }
  }
}
