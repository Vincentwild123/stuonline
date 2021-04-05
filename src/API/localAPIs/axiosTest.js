import instance from '../../axios/axios.interceptors.js'

export function testNet() {
    return instance.get('http://localhost:3000/', {
        msg: 'hello',
    }, )
}