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
		token:"sdfeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjI0MTg2MDgsInVzZXJJZCI6IjEifQ.TvC9nL78ArYCpQqPwCciJ3Ji5yW6Ef8KwH5NSDHPiyI"
	}
}
export default config;