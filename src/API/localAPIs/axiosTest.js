
import instance from '../../axios/axios.interceptors.js'

import axios from '../../axios/index.js'

export function testNet() {
    return axios.get('http://localhost:3000/', {
        msg: 'hello',
    }, )
}