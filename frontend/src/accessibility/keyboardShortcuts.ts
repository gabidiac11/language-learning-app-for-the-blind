export const isMicOnOffKeyboardEvent = (event: KeyboardEvent) =>
  event.ctrlKey && event.code === "Space";
