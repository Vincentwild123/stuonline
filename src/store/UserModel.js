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
    isLogin:(state)=>{
      if(JSON.stringify(state.userData)=="{}"){
        return false;
      }else{
        return true;
      }
    }
  },
  actions: {},
};
