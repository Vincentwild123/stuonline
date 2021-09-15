//已经选择的标签（自定义）
export default{
  namespaced:true,
  state:{
    selectedLabels:[]//已经选择的标签
  },
  mutations:{
    setLabels(state,payload){
      state.selectedLabels = payload;
    },
  },
  actions:{

  },
  getters:{

  }
}