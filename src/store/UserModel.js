export default {
	namespaced: true,
	state: {
		//用户状态 0表示游客，1表示已登录
		userStatus: 0,
		userData: {},
	},
	mutations: {
		setUserData(state, payload) {
			state.userData = payload.userData;
		},
		setUserStatus(state, payload) {
			state.userStatus = payload.status;
		}
	},
	getters: {
		userData: (state) => state.userData,
		isLogin: (state) => state.userStatus,
	},
	actions: {},
};
