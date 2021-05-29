import api from "../../API/interfaceAPIs/caixiaocai/api"
import axios from "../axios.interceptors"

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
