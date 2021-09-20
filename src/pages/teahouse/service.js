import api from "./api.js";
import axios from "../../axios/axios.interceptors";
//发布帖子
export function createPost(formData, files) {
  return axios.post(
    api.card.createCard,
    { formData, files },
    {
      ContentType: "multipart/form-data",
    }
  );
}
//无条件获取帖子
export function getFloor(postId, limit) {
  return axios.get(api.card.listCard + "/" + postId + "/" + limit);
}
//根据模块获取帖子
export function getModulePostList(postModule, postId, limit) {
  return axios.get(
    api.card.getModulePostList + "/" + postModule + "/" + postId + "/" + limit
  );
}
//点赞
export function setLike(postId) {
  return axios.post(api.card.likeIt + "/" + postId);
}
//取消点赞
export function setUnLike(postId) {
  return axios.delete(api.card.unlikeIt + "/" + postId);
}
//获取帖子的一级评论
export function getPostComment(postId, comId, limit) {
  return axios.get(
    api.card.commonCardFirst + "/" + postId + "/" + comId + "/" + limit
  );
}
//获取帖子的二级评论
export function getPostSecondComment(postId, comSecond, comId, limit) {
  return axios.get(
    api.card.commonCardSecond +
    "/" +
    postId +
    "/" +
    comSecond +
    "/" +
    comId +
    "/" +
    limit
  );
}
//创建一级评论--创建二级评论
export function createComment(postId, data) {
  return axios.post(api.card.commonIt + "/" + postId, data, {
    //axios 默认是 Payload格式数据请求，但有时候后端接收参数要求必须是 Form Data 格式的，所以进行转换
    ContentType: "application/x-www-form-urlencoded",
  });
}
//获取大厅的任务
export function getMissionList(lastMissionId, pageSize) {
  return axios.get(
    api.mission.getMissonList + "/" + lastMissionId + "/" + pageSize
  );
}
//查询最后的任务的id
export function getLastMissionId() {
  return axios.get(api.mission.getLastMissionId);
}
//接受任务
export function acceptMission(missionId) {
  return axios.post(api.mission.acceptMission + "/" + missionId);
}
//获取热门标签
export function getTopTags(num) {
  return axios.get(api.card.hotTag + "/" + num);
}
//根据标签获取帖子
export function getPostByTag(tag,postId,limit){
  return axios.get(api.card.getTagPostList+"/"+tag+"/"+postId+"/"+limit);
}
//根据任务ID获取任务
export function getMissionByMisID(id){
  return axios.get(api.mission.getMissionByMisId+"/"+id);
}
//根据发布者Id获取任务
export function getMissionByUserId(id){
  return  axios.get(api.mission.getMissionByUserId+"/"+id);
}