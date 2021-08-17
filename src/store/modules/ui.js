export default {
	namespaced: true,
	state: {
		loads: 0
	},
	getters: {
		loads: state => {
			return state.loads;
		},
		loading: state => {
			return state.loads > 0;
		}
	},
	mutations: {
		INCREMENT_LOADS (state) {
			state.loads++;
		},
		DECREMENT_LOADS (state) {
			state.loads--;
		}
	},
	actions: {

	},
}