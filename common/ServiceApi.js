const BASE_URL = 'http://localhost:8080/'

const SERVICE_API = {
	// 汽车花费
	COST_CAR_LIST: BASE_URL + 'cost/car/list',
	COST_CAR_DELETE: BASE_URL + 'cost/car/delete',
	COST_CAR_ADD: BASE_URL + 'cost/car/add',
	
	// 系统管理
	// 字典表
	SYS_DICT_LIST: BASE_URL + 'sys/dict/list',
	
}

export default {
	SERVICE_API
}