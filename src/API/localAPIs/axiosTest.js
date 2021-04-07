<<<<<<< HEAD
import instance from '../../axios/axios.interceptors.js'

export function testNet() {
    return instance.get('http://localhost:3000/', {
=======
import axios from '../../axios/index.js'

export function testNet() {
    return axios.get('http://localhost:3000/', {
>>>>>>> 431ea731e4effdf94b192f780614fdb7249fa46b
        msg: 'hello',
    }, )
}