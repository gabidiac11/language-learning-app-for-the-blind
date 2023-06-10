import { dialogFlowBaseSessionPath } from "../constants";

export class DialogflowSessionString {
  private static instance: DialogflowSessionString;
  public static getInstance(): DialogflowSessionString {
    if (DialogflowSessionString.instance) {
      return DialogflowSessionString.instance;
    }

    DialogflowSessionString.instance = new DialogflowSessionString(
      dialogFlowBaseSessionPath
    );
    return DialogflowSessionString.instance;
  }

  public baseSessionPath: string;
  
  private _regex =
    /projects\/([^/]+)\/locations\/([^/]+)\/agents\/([^/]+)\/environments\/([^/]+)/;
  projectId: string;
  location: string;
  environment: string;
  agentId: string;

  apiEndpoint: string;

  private constructor(basePath: string) {
    this.assignBasePath(basePath);
  }

  private assignBasePath(basePath: string) {
    if (!this._regex.test(basePath)) {
      throw `${basePath} is not valid and does match regex ${this._regex}`;
    }

    this.baseSessionPath = basePath;

    const matchResult = basePath.match(this._regex);

    const [, projectId, location, agentId, environment] = matchResult;
    this.projectId = projectId;
    this.location = location;
    this.agentId = agentId;
    this.environment = environment;

    this.apiEndpoint = `${location}-dialogflow.googleapis.com`;
  }

  public createUserSessionPath(userId: string): string {
    const sessionId = userId;

    const userSessionPath = `${this.baseSessionPath}/users/${userId}/sessions/${sessionId}`;
    return userSessionPath;
  }
}
