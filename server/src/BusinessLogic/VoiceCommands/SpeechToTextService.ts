import { SpeechClient } from "@google-cloud/speech";
import { log } from "../../logger";
import {
  ApiErrorResponse,
  getStringifiedError,
} from "../../ApiSupport/apiErrorHelpers";
import Result from "../../ApiSupport/Result";
import { apiMessages } from "../../ApiSupport/apiMessages";
import { CloudCredentials } from "../../Configuration/CloudCredentials";

export class SpeechToTextService {
  private static Instance: SpeechToTextService;
  public static getInstance(): SpeechToTextService {
    if (!SpeechToTextService.Instance) {
      SpeechToTextService.Instance = new SpeechToTextService();
    }
    return SpeechToTextService.Instance;
  }

  private _client: SpeechClient;
  constructor() {}

  private async getClient() {
    if (this._client) {
      return this._client;
    }

    const credentials = await CloudCredentials.getInstance().getCredentials();

    try {
      this._client = new SpeechClient({
        credentials: credentials,
      });
    } catch (err) {
      log(
        `[SpeechToTextService]: Error while instantiating client`,
        getStringifiedError(err)
      );
      throw ApiErrorResponse.InternalError();
    }
    return this._client;
  }

  public async convertSpeechToText(
    file: Express.Multer.File
  ): Promise<Result<string>> {
    const client = await this.getClient();
    
    try {
      log(`[SpeechToTextService]: Initiating request...`);

      const [audioResponse] = await client.recognize({
        audio: {
          content: file.buffer,
        },
        config: {
          // use language code for non-native English speakers -> en-IN Indian should work better than en-US
          // use language code for non-native English speakers -> en-GB Indian should work better than en-US 
          languageCode: "en-GB",
        },
      });

      if (!audioResponse.results) {
        log(`[SpeechToTextService]: Not recognised`, audioResponse);
        return Result.ErrorBadGateway<string>(apiMessages.speechNotRecognised);
      }

      const text = (audioResponse.results ?? [])
        .map((result) => result.alternatives[0].transcript)
        .join("\n");

      log(`[SpeechToTextService]: Transcription: ${text}`);

      return Result.Success(text);
    } catch (err) {
      log(
        `[SpeechToTextService]: error while generating speech`,
        getStringifiedError(err)
      );
      throw ApiErrorResponse.InternalError();
    }
  }
}
