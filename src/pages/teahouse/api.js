var _api_root = "http://192.168.13.46:30080/";
var _api2_root = "http://192.168.13.46:31312/"
var api = {
  card: {
    test: _api_root + "post/fileTest3",
    createCard: _api_root + "post/createPost",
    deleteCard: _api_root + "post/deletePost",
    alterCard: _api_root + "post/updatePost/get",
    getAlterCard: _api_root + "post/updatePost/update",
    detailCard: _api_root + "post/getPost",
    commonCardFirst: _api_root + "post/getPostComment",
    commonCardSecond: _api_root + "post/getPostSecondComment",
    getPostList: _api_root + "post/getPostList",
    getTagPostList: _api_root + "/post/getTagPostList",
    getModulePostList: _api_root + "/post/getModulePostList",
    likeIt: _api_root + "post/like",
    unlikeIt: _api_root + "post/unlike",
    commonIt: _api_root + "post/createComment",
    hotTag: _api_root + "post/topTag"
  },
  medal: {
    getTeamMedal: _api_root + "badge/getTeamBadge",
    getAchieveMedal: _api_root + "badge/getAchievementBadge",
    getWearingMedal: _api_root + "badge/getWearingBadge",
    undateMedal: _api_root + "badge/getWearingBadge",
  },
  notice: {
    getNoticeCount: _api_root + "notice/getNoticeCount",
    getNotice: _api_root + "notice/getNotice",
  },
  mission: {
    getMissonList: _api2_root + "mission/hall",
    getLastMissionId: _api2_root + "mission/id",
    acceptMission: _api2_root + "mission/take",
    getMissionByMisId:_api2_root + "mission/id",
    getMissionByUserId:_api2_root+"mission/pusher"
  }
};
export default api;
