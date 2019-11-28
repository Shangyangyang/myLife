const conf = {
	configList: [{
			name: '金额',
			field: 'money',
			type: {
				code: 'input',
				type: 'number',
				maxL: 5,
			},
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
		{
			name: '类型',
			field: 'type',
			type: {
				code: 'select',
				label: 'car_type',
			},
			value: '1',
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
		{
			name: '里程',
			field: 'licheng',
			type: {
				code: 'input',
				type: 'number',
				maxL: 8,
			},
			showBy: 'type=1',
			showFlag: true,
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
		{
			name: '油价',
			field: 'youjia',
			type: {
				code: 'input',
				type: 'number',
				maxL: 5,
			},
			showBy: 'type=1',
			showFlag: true,
			valid: {
				allowEmpty: false,
			},
			validFlag: true,
		},
		{
			name: '备注',
			field: 'reason',
			type: {
				code: 'input',
				maxL: 100,
			},
			validFlag: true,
		},
		{
			name: '消费日期',
			field: 'inputDate',
			type: {
				code: 'selectDate',
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
}
