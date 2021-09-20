export function ifAccountValid(account) {
  return typeof account == "string" && /^[0-9]{2}[a-z]+/.test(account);
}
export function checkStatusCode(data) {
  return data && data.data && data.data.status == 200;
}
export function checkObjectNoEmpty(o) {
  for (let key in o) {
    if (o[key] == "" || !o[key]) return false;
  }
  return true;
}
