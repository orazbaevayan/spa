import axios from 'axios'
import store from '@/store'

axios.interceptors.request.use((config) => {
	config.headers['Accept-Language'] = store.getters['locales/language'];
	store.commit('ui/INCREMENT_LOADS');
	return config;
}, (error) => {
	store.commit('ui/DECREMENT_LOADS');
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	store.commit('ui/DECREMENT_LOADS');
	return response;
}, (error) => {
	store.commit('ui/DECREMENT_LOADS');
	return Promise.reject(error);
});

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;

export default axios