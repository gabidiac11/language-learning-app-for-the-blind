export default class Config {
  public fileStorageCtxKey: string;
  public fileStorageCtxIdCounterKey: string;

  // TODO: read from a json file
  constructor() {
    this.fileStorageCtxKey = "app-mock-ctx";
    this.fileStorageCtxIdCounterKey = "app-mock-ctx-id-counter";
  }
}
