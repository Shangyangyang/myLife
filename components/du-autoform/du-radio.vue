<template>
	<radio-group style="white-space:nowrap;" class="du-radio-right" name="du-radio" @change="radioChange" :class="(defaultValue=='')?'du-normol':'du-selected'">
		<label :style="readonly?'padding-right: 0px;':''" v-show="!readonly || defaultValue == value1">
			<radio style="transform:scale(0.8)" :value="value1" :checked="defaultValue == value1" />{{label1}}</label>
		<label :style="readonly?'padding-right: 0px':''" v-show="!readonly || defaultValue == value2">
			<radio :disabled="readonly&&(label2=='无'||label2=='否')" style="transform:scale(0.8)" :value="value2" :checked="defaultValue == value2" />{{label2}}</label>
	</radio-group>
</template>

<script>
	export default {
		name: 'DURadio',
		props: {
			defaultValue: {
				type: String,
				default: ''
			},
			config: {
				type: Object
			},
			readonly: {
				type: Boolean,
				default: false
			},
			disable: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			value1: function() {
				return this.config.value1 ? this.config.value1 : '1';
			},
			value2: function() {
				return this.config.value2 ? this.config.value2 : '2';
			},
			label1: function() {
				return this.config.label1 ? this.config.label1 : '是';
			},
			label2: function() {
				return this.config.label2 ? this.config.label2 : '否';
			}
		},
		methods: {
			radioChange: function(e) {
				this.$emit('fieldChange', {
					field: this.config.field,
					value: e.target.value
				});
			}
		}
	}
</script>

<style>
	.du-selected {
		color: #000000;
	}

	.du-normol {
		color: #6260c7;
	}

	.du-radio-right {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
</style>
