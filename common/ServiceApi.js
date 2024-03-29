const BASE_URL = 'http://localhost:8080/'
// const BASE_URL = 'http://mylife.free.idcfengye.com/'

const SERVICE_API = {
	// 汽车花费
	COST_CAR_LIST: BASE_URL + 'cost/car/list',
	COST_CAR_DELETE: BASE_URL + 'cost/car/delete',
	COST_CAR_SAVE: BASE_URL + 'cost/car/save',
	COST_CAR_GETOILWEAR: BASE_URL + 'cost/car/getOilWear',
	COST_CAR_GETJSONSTR: BASE_URL + 'cost/car/getJsonStr',
	
	// 系统管理
	// 字典表
	SYS_DICT_LIST: BASE_URL + 'sys/dict/list',
	
	// 登录
	SYS_LOGIN: BASE_URL + 'sys/login/m/login',
}

export default {
	SERVICE_API
}