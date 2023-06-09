export function logAudioQueue(value: any, obj?: any) {
  if (obj) {
    const _obj = JSON.parse(JSON.stringify(obj));
    console.log(`[AUDIO-LOG->${value}]:`, _obj);
    return;
  }
  console.log(`[AUDIO-LOG->${value}]:`);
}
