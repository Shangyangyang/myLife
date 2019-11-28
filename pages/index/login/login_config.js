const conf = {
	configList: [
		{
			name: '用户名',
			field: 'userName',
			type: {
				code: 'input',
				maxL: 20,
			},
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
		{
			name: '密码',
			field: 'password',
			type: {
				code: 'input',
				isPwd: true,
				maxL: 20,
			},
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
	],
	checkFlag: false,
	checkMsg: '',
}

export {
	conf as
	default
};
