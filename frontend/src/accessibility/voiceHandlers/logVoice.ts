export function logVoice(value: any, obj?: any) {
  if (obj) {
    console.log(`[VOICE->${value}]:`, obj);
    return;
  }
  console.log(`[VOICE->${value}]:`);
}
