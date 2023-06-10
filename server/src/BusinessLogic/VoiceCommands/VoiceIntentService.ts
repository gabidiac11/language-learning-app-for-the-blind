import { SessionsClient } from "@google-cloud/dialogflow-cx";

import Result from "../../ApiSupport/Result";
import { log } from "../../logger";
import {
  ApiErrorResponse,
  getStringifiedError,
} from "../../ApiSupport/apiErrorHelpers";
import { SpeechToTextService } from "./SpeechToTextService";
import { CloudCredentials } from "../../Configuration/CloudCredentials";
import { DialogflowSessionString } from "../../Configuration/DialogflowSessionString";
import {
  dialogFlowBaseSessionPath,
  dialogFlowTargetPath,
} from "../../constants";
import {
  getMatchedCommand,
  IntentQueryResultProjection,
} from "./intentResponseProjection";
import { genUid } from "../../utils";
import { UserVoiceCommandResponse } from "../../Models/voiceCommand.types";

export class VoiceIntentService {
  private static Instance: VoiceIntentService;
  public static getInstance() {
    const speechToTextService = SpeechToTextService.getInstance();
    if (!VoiceIntentService.Instance) {
      VoiceIntentService.Instance = new VoiceIntentService(speechToTextService);
    }
    return VoiceIntentService.Instance;
  }

  private _clientCached: SessionsClient;
  private _speechToTextService: SpeechToTextService;

  constructor(speechToTextService: SpeechToTextService) {
    this._speechToTextService = speechToTextService;
  }

  private async getClient() {
    if (this._clientCached) {
      return this._clientCached;
    }

    const credentials = await CloudCredentials.getInstance().getCredentials();
    const dialogFlowConnectionString = DialogflowSessionString.getInstance();

    try {
      this._clientCached = new SessionsClient({
        credentials: credentials,
        apiEndpoint: dialogFlowConnectionString.apiEndpoint,
      });
    } catch (err) {
      log(
        `[DialogFlowService]: Error while instantiating client`,
        getStringifiedError(err)
      );
      throw ApiErrorResponse.InternalError();
    }
    return this._clientCached;
  }

  public async getDetectedCommandFromSpeech(
    file: Express.Multer.File,
    userId: string
  ): Promise<Result<UserVoiceCommandResponse>> {
    const sessionClient = await this.getClient(); // make it throw error if getting the cached client doesn't work

    const resultText = await this._speechToTextService.convertSpeechToText(file);
    if (resultText.isError()) {
      return resultText.As<UserVoiceCommandResponse>();
    }
    // const resultText = Result.Success("go to russian");

    const dialogFlowConnectionString = DialogflowSessionString.getInstance();

    const sessionId = genUid();
    const userSessionPath = `${dialogFlowConnectionString.baseSessionPath}/sessions/${sessionId}`;

    const responses = await sessionClient.detectIntent({
      session: userSessionPath,
      queryInput: {
        text: {
          text: resultText.data,
        },
        languageCode: "en",
      },
      queryParams: {
        currentPage: dialogFlowTargetPath,
      },
    });

    console.log({ responses: JSON.stringify({ responses }) });

    const queryResult = responses?.[0]?.queryResult;
    log(
      `[VoiceIntentService]: Detected intent ${queryResult?.intent?.displayName}`
    );
    log(
      `[VoiceIntentService]: Intent confidence: ${queryResult?.intentDetectionConfidence}`
    );
    log(`[VoiceIntentService]: Parameters:`, queryResult?.parameters);

    const command = getMatchedCommand(
      queryResult as IntentQueryResultProjection
    );

    const response:UserVoiceCommandResponse = {
      command,
      userSpeechText: resultText.data 
    };
    return Result.Success(response);
  }
}
