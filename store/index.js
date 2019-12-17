import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user: {}
}

const mutations = {
	saveUser(state, bean) {
		state.user = bean;
		uni.setStorage('user', bean)
	},
	clearAllData(state) {
		state.bean = {};
	}
}

const actions = {
	setUser({
		commit
	}, bean) {
		commit('saveUser', bean);
	},
}

const getters = {
	getUser: state => {
		if (state.user === undefined || state.user === null || state.user === '') {
			state.user = uni.getStorageSync('user')
		}

		return state.user;
	},
}

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

export default store
