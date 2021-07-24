import axios from "../../../axios/axios.interceptors.js";
export default async function uploadImage(imgs) {
  try {
    axios.post("http://192.168.13.46:30080/post/createPost", {
      postHidename: 0,
      postText: "上传图片测试",
      postModule: 0,
      tagNameList: ["图片", "测试"],
      image1: imgs[0],
    });
  } catch (error) {
    console.error(error);
  }
}
