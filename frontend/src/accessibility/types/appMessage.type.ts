export type AppMessage = {
  text: string;
  uniqueName: string;
  filePath: string;

  preventForcedStopOnCurrentPage?: boolean;
  preventForcedStopOnCurrentPageJustOnce?: boolean; // save to localStorage when this was played
};
