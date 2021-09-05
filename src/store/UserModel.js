export default {
  namespaced: true,
  state: {
    userData: {},
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload.userData;
    },
  },
  getters: {
    getUserData: (state) => state.userData,
  },
  actions: {},
};
