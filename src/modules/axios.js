import axios from 'axios'
import store from '@/store'

axios.interceptors.request.use(
	function (config) {
		config.headers['Accept-Language'] = store.getters['locales/language'];
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
axios.defaults.withCredentials = true;

export default axios