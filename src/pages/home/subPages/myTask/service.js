import axios from "../../../../axios/axios.interceptors";
export async function queryTaskSendByI() {
  const res = await axios.get("/mission/opening/self");
  if (res && res.data) {
    const { status } = res.data;
    switch (status) {
      case 200:
        return res.data.data;
        break;
      case 201:
        return [];
      default:
        break;
    }
  }
}
