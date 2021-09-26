export default {
	namespaced: true,
	state: {
		range: 5,
		elements: 2,
		currentPage: 1
	},
	getters: {
		range: state => {
			return state.range;
		},
		elements: state => {
			return state.elements;
		},
		currentPage: state => {
			return state.currentPage;
		},
		currentPageElements: (state) => (elements) => {
			return elements.filter((element, index) => {
				return (index + 1) > ((state.currentPage - 1) * state.elements) && (index + 1) <= (state.currentPage * state.elements);
			});
		},
	},
	mutations: {
		SET_CURRENT_PAGE (state, page) {
			state.currentPage = Number.parseInt(page);
		}
	},
	actions: {
		/*toggleFocus(context, focus = '') {
			if (context.getters['focus'] == focus) {
				context.commit('SET_FOCUS', '');
			} else {
				context.commit('SET_FOCUS', focus);
			}
		},*/
	},
}