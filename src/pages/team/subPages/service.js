import {
	getTeamHaveJoined,
	getTeamInfoById
} from "../service";

export var pageUrl = {
	createTeam: "/src/pages/team/subPages/createTeam",
	shomTeamMembers: "/src/pages/team/subPages/showTeamMembers",
	searchBar: "/src/pages/team/subPages/searchBar",
	teamDetailJoin: "/src/pages/team/subPages/teamDetail-join",
	teamDetailNoJoin: "/src/pages/team/subPages/teamDetail-nojoin",
	team: "/src/pages/team/team"
}
//判断是否已经加入该团队
export async function isJoin(teamId) {
	await getTeamHaveJoined()
		.then((value) => {
			let item;
			for (item in value.data) {
				if (teamId === item.teamId) return ture;
			}
			return false;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export function gotoPage(url, res, err) {
	uni.navigateTo({
		url: url,
		success: res,
		fail: err
	})
}

