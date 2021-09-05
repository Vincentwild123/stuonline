import Vue from "vue";
import Vuex from "vuex";
import UserModel from "./UserModel";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user: UserModel,
  },
});
export default store;
