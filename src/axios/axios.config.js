const config = {
    // the mothods of this request
    method: 'get', // default
    // the base url will unshift into the url you write in the parmas 
    baseURL: 'http://192.168.13.46:30080',
    timeout: 5000,
    // when cross origin,whether the request will cookie 
    withCredentials: false, // default
    // type of the reponse data
    reponseType: 'json',
	headers:{
		token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjAzNzY5MTAsInVzZXJJZCI6IjEifQ.mKVnF9NtU55Ea0wDZj6mWzqFPo_SGz08Iox0_eeQ5kw"
	}
}
export default config;