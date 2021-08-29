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
			let overlayElements = [
				'left-sidebar'
			];
			if (window.innerWidth < 992) overlayElements.push('right-sidebar');
			return overlayElements.includes(state.focus) || state.overlay ? true : false;
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
		}
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