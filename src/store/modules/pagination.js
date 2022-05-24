export default {
	namespaced: true,
	state: {
		data: {},
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
		data: (state) => (entity) => {
			return state.data[entity];
		}
	},
	mutations: {
		SET_CURRENT_PAGE (state, page) {
			state.currentPage = Number.parseInt(page);
		},
		SET_DATA (state, data) {
			state.data[data.entity] = { items: data.items, meta: data.meta, links: data.links };
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