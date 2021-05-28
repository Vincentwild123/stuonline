export function checkAccount(account) {
	return typeof account == 'string' && /^[0-9]{2}[a-z]+/.test(account);
}
export function checkStatusCode(data) {
	return data && data.data && data.data.status == 200;
}
