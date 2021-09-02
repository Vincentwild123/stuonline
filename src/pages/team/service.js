import axios from "../../axios/axios.interceptors";

var api_root = "http://192.168.13.46:31312/team/";

var api = {
  team: {
    //表单鉴权
    getMandate: api_root,
    // 创建团队
    createTeam: api_root + "register",
    //申请加入团队
    applyTeam: api_root + "apply/",
    //通过团队名称找团队
    findTeamByName: api_root + "name/",
    //通过团队ID找团队的详细信息
    findTeamById: api_root + "id/",
    //通过团队id查询团队成员
    findMenbersByTeamID: api_root + "members/",
    //查询团队的全部申请信息
    appliesByTeamID: api_root + "applies/",
    //查询团队的指定状态申请
    //查询已经加入的团队
    haveJoinedTeam: api_root + "haveJoined",
  },
};

/**
 * 表单鉴权token
 */
export async function getMandate() {
  var token = null;
  if (!token) {
    axios
      .get("http://192.168.13.46:31312/user/getToken/1")
      .then((res) => {
        console.log("token已经获取");
      })
      .catch((value) => {
        console.log(value);
      });
  }
  return await axios.get(api_root + "auth");
}

/**
 * 获取用户已经加入的团队
 */
export async function getHaveJoinedTeam() {
  return await axios.get(api_root + "haveJoined");
}

/**
 * 此功能正在开发
 */
export function getAllTeam() {
  return console.log("此功能正在开发");
}

/**
 * @param {Number} teamId 团队id
 * 通过团队id获取团队的成员
 */
export async function getTeamMembers(teamId) {
  return await axios.get(api_root + "members/" + teamId);
}

/**
 * @param {Number} teamId
 * @return {type}
 * 通过团队id获取团队的信息
 */
export async function getTeamInfoById(teamId) {
  return await axios.get(api_root + "id/" + teamId);
}

/**
 * @param {Object} teamId
 * @param {Object} memberId
 * @param {Object} token
 */
export async function deleteMemberInTeam(teamId, userId) {
  const data = await axios.get("http://192.168.13.46:31312/user/getToken/1");
  const token = data.data;
  return axios.delete(
    "team/member/" + teamId + "/" + userId + "/" + "?token=" + token
  );
}
export function getInStorage(key) {
  try {
    var value = uni.getStorageSync(key);
    return value;
  } catch (e) {
    console.log(e);
  }
}

export function getTeamByTeamName(pageNum, pageSize, teamName) {
  return axios.get(
    api_root + "name/" + pageNum + "/" + pageSize + "?" + "teamName=" + teamName
  );
}
