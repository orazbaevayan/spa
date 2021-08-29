export default {
	namespaced: true,
	state: {
		loads: 0,
		focus: '',
		overlay: false
	},
	getters: {
		loads: state => {
			return state.loads;
		},
		loading: state => {
			return state.loads > 0;
		},
		focus: state => {
			return state.focus;
		},
		overlay: state => {
			return state.overlay;
		},
		overlayClass: (state) => {
			let classes = {
				'left-sidebar': '',
				'right-sidebar': 'd-lg-none'
			};
			return classes[state.focus] != undefined ? classes[state.focus] : 'd-none';
		}
	},
	mutations: {
		INCREMENT_LOADS (state) {
			state.loads++;
		},
		DECREMENT_LOADS (state) {
			state.loads--;
		},
		SET_FOCUS (state, focus) {
			state.focus = focus;
		},
		SET_OVERLAY (state, overlay) {
			state.overlay = overlay;
		},
	},
	actions: {
		toggleFocus(context, focus = '') {
			if (context.getters.focus == focus) {
				context.commit('SET_FOCUS', '');
			} else {
				context.commit('SET_FOCUS', focus);
			}
		},
		clearFocus(context, focus = null) {
			if (context.getters.focus === focus || focus === null) {
				context.commit('SET_FOCUS', '');
			}
		}
	},
}