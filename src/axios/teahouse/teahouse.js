import api from '../../API/interfaceAPIs/teahouse/api.js';
import axios from "../index.js";

 export function    getFloor(postId,limit){
		return  axios.get(api.card.listCard+'/'+postId+'/'+limit, {
			headers: {
				'Content-Type':'application/x-www-form-urlencoded'
			}
		  }, )
	   }