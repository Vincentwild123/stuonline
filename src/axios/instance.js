import axios from './axios.js'
import config from './axios.config.js'
// create an instance with the config 
const instance = axios.create(config);
//export the global instance
export default instance;