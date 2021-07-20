import {getTeamHaveJoined,getTeamInfoById} from "@/src/API/interfaceAPIs/chenguangteng/teamApi.js"

//判断是否已经加入该团队
export async function isJoin(teamId){
	await getTeamHaveJoined()
	.then((value)=>{
		let item;
		for(item in value.data){
			if(teamId === item.teamId)
				return ture;
		}
		return false;
	})
	.catch((err)=>{
		console.log(err);
		return false;
	})
}
