import Vue from "vue";
import Vuex from "vuex";
import UserModel from "./UserModel";
import PostBarModel from "./PostBarModel";
import selectedLabelsModel from "./selectedLabelsModel"
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user: UserModel,
    postBar: PostBarModel,
    selectedLabels:selectedLabelsModel
  },
});
export default store;
