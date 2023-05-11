export function log(value: any, obj?: any) {
  // TODO: I should find some cloud service for this one
  if (obj) {
    const _obj = JSON.stringify(obj, null, 2);
    console.log(value, _obj);
    return;
  }
  console.log(value);
}
