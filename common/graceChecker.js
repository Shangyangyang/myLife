
module.exports = {
	error:'',
	check : function (data, rule){
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].errorMsg) {return true;}
			
			let val;
			if (rule[i].name){
				val = data[rule[i].name];
			}else{
				val = data;
			}
			console.log(rule[i].checkType+'-'+val);
			
			if (!val) {this.error = rule[i].errorMsg; return false;}
						
			switch (rule[i].checkType){
				case 'string':
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if(!reg.test(val)) {this.error = rule[i].errorMsg; return false;}
				break;
				case 'int':
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
					if(!reg.test(val)) {this.error = rule[i].errorMsg; return false;}
					break;
				break;
				case 'between':
					if (!this.isNumber(val)){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (val > minMax[1] || val < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenD':
					var reg = /^-?[1-9][0-9]*$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (val > minMax[1] || val < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenF': 
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(val)){this.error = rule[i].errorMsg; return false;}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (val > minMax[1] || val < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'same':
					if (val != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
				break;
				case 'notsame':
					if (val == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'idcard':
					if (!this.checkIDCard(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'phoneno':
				//
					var reg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})(-[0-9]{1,4})?$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'mobphoneno':
					var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'tel':
					var reg1 = /^1(3|4|5|6|7|8|9)\d{9}$/;
					var reg2 = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})(-[0-9]{1,4})?$/;
					if (!reg1.test(val) && !reg2.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'cn':
					var reg = /^[\u4E00-\u9FA5]+$/;
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'reg':
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(val)) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'in':
					if(rule[i].checkRule.indexOf(val) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'notnull':
					if(val == null || val.length < 1){this.error = rule[i].errorMsg; return false;}
				break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
	checkIDCard:function(idcode){
		// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
		// 详情查看javascript的数值范围
		// 加权因子
		var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
		// 校验码
		var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

		var code = idcode + "";
		var last = idcode[17];//最后一个

		var seventeen = code.substring(0,17);

		// ISO 7064:1983.MOD 11-2
		// 判断最后一位校验码是否正确
		var arr = seventeen.split("");
		var len = arr.length;
		var num = 0;
		for(var i = 0; i < len; i++){
			num = num + arr[i] * weight_factor[i];
		}
		
		// 获取余数
		var resisue = num%11;
		var last_no = check_code[resisue];

		// 格式的正则
		// 正则思路
		/*
		第一位不可能是0
		第二位到第六位可以是0-9
		第七位到第十位是年份，所以七八位为19或者20
		十一位和十二位是月份，这两位是01-12之间的数值
		十三位和十四位是日期，是从01-31之间的数值
		十五，十六，十七都是数字0-9
		十八位可能是数字0-9，也可能是X
		*/
		var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

		// 判断格式是否正确
		var format = idcard_patter.test(idcode);

		// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
		return last === last_no && format ? true : false;
	}
	
	
}