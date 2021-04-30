import api from '../../API/interfaceAPIs/caixiaocai/teaHouse_modules/api.js';
import axios from "../index.js";

export function getFloor(postId, limit) {
	return axios.get(api.card.listCard + '/' + postId + '/' + limit, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
export function setLike(postId) { 
	return axios.post(api.card.likeIt + '/' + postId, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
export function setUnLike(postId) {
	return axios.delete(api.card.unlikeIt + '/' + postId, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}