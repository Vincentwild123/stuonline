var _api_root = "http://192.168.13.46:30080/";
var api = {
  card: {
    createCard: _api_root + "post/createPost",
    deleteCard: _api_root + "post/deletePost",
    alterCard: _api_root + "post/updatePost/get",
    getAlterCard: _api_root + "post/updatePost/get",
    detailCard: _api_root + "post/getPost",
    commonCardFirst: _api_root + "post/getPostComment",
    commonCardSecond: _api_root + "post/getPostSecondComment",
    listCard: _api_root + "post/getPostList",
    likeIt: _api_root + "post/like",
    unlikeIt: _api_root + "post/unlike",
    commonIt: _api_root + "post/createComment",
    hotTag: _api_root + "post/topTag",
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
};
export default api;
