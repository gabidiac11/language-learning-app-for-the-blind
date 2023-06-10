import BaseController from "./BaseController";
import { Authenticator } from "../ApiSupport/authentication";
import { Example, Post, Route, Security, Tags, UploadedFile } from "tsoa";
import { VoiceIntentService } from "../BusinessLogic/VoiceCommands/VoiceIntentService";
import { ApiErrorResponse } from "../ApiSupport/apiErrorHelpers";
import {
  AcessLanguageCommandPayloadResponse,
  AudioUserCommandType,
  UserVoiceCommandResponse,
} from "../Models/voiceCommand.types";
import * as exmp from "../ApiSupport/commandResponseExamples";

// NOTE: use factory given that each controller has fields strictly required within the scope of a request
export class VoiceCommandsControllerFactory {
  public static inject = [Authenticator.name, VoiceIntentService.name];

  private _authenticator: Authenticator;
  private _voiceIntentService: VoiceIntentService;
  constructor(
    authenticator: Authenticator,
    voiceIntentService: VoiceIntentService
  ) {
    this._authenticator = authenticator;
    this._voiceIntentService = voiceIntentService;
  }

  public create(): VoiceCommandsController {
    const controller = new VoiceCommandsController(
      this._authenticator,
      this._voiceIntentService
    );
    return controller;
  }
}

@Tags("Voice commands")
@Security("BearerAuth")
@Route("api/voice-commands")
export class VoiceCommandsController extends BaseController {
  private _voiceIntentService: VoiceIntentService;

  constructor(
    authenticator: Authenticator,
    voiceIntentService: VoiceIntentService
  ) {
    super(authenticator);
    this._voiceIntentService = voiceIntentService;
  }

  /**
   * Receives an audio file, gets the text from the speech and matches that text to an intention (command) that the frontend can use to change things on the page
   */
  @Post("/")
  @Example(
    exmp.exampleAccessQuiz,
    AudioUserCommandType.AccessQuiz
  )
  @Example(
    exmp.exampleDescribePage,
    AudioUserCommandType.DescribePage
  )
  @Example(
    exmp.exampleReadLanguages,
    AudioUserCommandType.ReadLanguages
  )
  @Example<AcessLanguageCommandPayloadResponse>(
    exmp.exampleAcessLanguage,
    AudioUserCommandType.AcessLanguage
  )
  @Example(
    exmp.exampleLogout,
    AudioUserCommandType.Logout
  )
  @Example(
    exmp.exampleNavigateBack,
    AudioUserCommandType.NavigateBack
  )
  @Example(
    exmp.exampleNavigateToBlock,
    AudioUserCommandType.NavigateToBlock
  )
  @Example(
    exmp.exampleRespondQuiz,
    AudioUserCommandType.RespondQuiz
  )
  @Example(
    exmp.exampleGoToNextWord,
    AudioUserCommandType.GoToNextWord
  )
  @Example(
    exmp.exampleReadAchievements,
    AudioUserCommandType.ReadAchievements
  )
  @Example(
    exmp.exampleLogin,
    AudioUserCommandType.Login
  )
  @Example(
    exmp.exampleAcessLessonStory,
    AudioUserCommandType.AcessLessonStory
  )
  @Example(
    exmp.exampleReadWhatBlocks,
    AudioUserCommandType.ReadWhatBlocks
  )
  @Example(
    exmp.exampleReadLessonStories,
    AudioUserCommandType.ReadLessonStories
  )
  @Example(
    exmp.exampleAccessWordsSummary,
    AudioUserCommandType.AccessWordsSummary
  )
  @Example(
    exmp.exampleReadThecurrentWord,
    AudioUserCommandType.ReadThecurrentWord
  )
  @Example(
    exmp.exampleEpilogueReadShortStory,
    AudioUserCommandType.EpilogueReadShortStory
  )
  @Example(
    exmp.exampleCommandUnidentified,
    AudioUserCommandType.CommandUnidentified
  )
  public async getCommandFromSpeech(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserVoiceCommandResponse> {
    const userId = this.getUser().uid;
    const result = await this._voiceIntentService.getDetectedCommandFromSpeech(
      file,
      userId
    );
    if (result.isError()) {
      throw ApiErrorResponse.ErrorResult(result);
    }
    return result.data;
  }
}
