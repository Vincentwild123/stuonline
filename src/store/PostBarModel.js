export default {
    namespaced: true,
    state: {
        postMes: {},//post的详情--用于一级评论
        comMes:{},//comment详情--用于二级评论
        isFirstCommment: true,//是否是一级评论
        isFocus: false,//是否聚焦
        placeholder:'请输入你的评论....'
    },
    mutations: {
        setPostMes(state, payload) {
            state.postMes = payload;
            state.placeholder='请输入你的评论....';
        },
        setIsFirstCommment(state, payload) {
            state.isFirstCommment = payload;
        },
        setIsFocus(state, payload) {
            state.isFocus = payload;
        },
        setComMes(state, payload) {
            state.placeholder=`请输入回复${payload.commentMes.userSimple.userName}的评论`;
            state.comMes = payload;
        },
    },
    getters: {
        //   getUserData: (state) => state.userData,
    },
    actions: {},
};