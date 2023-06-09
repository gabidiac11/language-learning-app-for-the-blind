export enum MicPermissionStatus {
  Denied = "Denied",
  Granted = "Granted",
  Unknown = "Unknown",
}
export enum RecState {
  NotRecording = "NotRecording",
  FetchingCommand = "FetchingCommand",
  Recording = "Recording",
}
export type EventMediaListeners = {
  dataavailable: (event: BlobEvent) => void;
  stop: () => void;
};
