import { getStringifiedError } from "../ApiSupport/apiErrorHelpers";
import { CloudCredentials } from "../Configuration/CloudCredentials";
import { Storage } from "@google-cloud/storage";
import { seedFileBucket } from "../constants";
import { log } from "../logger";

export class CloudStorageService {
  private static Instance: CloudStorageService;
  public static getInstance(): CloudStorageService {
    if (!CloudStorageService.Instance) {
      CloudStorageService.Instance = new CloudStorageService();
    }
    return CloudStorageService.Instance;
  }

  private _client: Storage;
  constructor() {}

  private async getClient() {
    if (this._client) {
      return this._client;
    }

    const credentials = await CloudCredentials.getInstance().getCredentials();
    try {
      this._client = new Storage({
        credentials,
      });
    } catch (err) {
      throw `[CloudStorageService]: Error while instantiating client ${getStringifiedError(
        err
      )}`;
    }
    return this._client;
  }

  public async uploadSeedFile(filePath, buffer: Buffer) {
    const bucketName = seedFileBucket;
    log(`Uploading file '${filePath}'...`);
    try {
      const client = await this.getClient();
      await client.bucket(bucketName).file(filePath).save(buffer);
      log(`Uploaded.`);
    } catch (err) {
      log("Failed upload.", err);
      log(`------------------ err ------------------`);
    }
  }
}
