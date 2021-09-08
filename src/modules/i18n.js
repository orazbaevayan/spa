import { createI18n } from 'vue-i18n'
import store from '@/store'
import ru from '@/lang/ru'
import kk from '@/lang/kk'
import en from '@/lang/en'

export default createI18n({
	locale: store.getters['locales/language'],
	legacy: true,
	messages: {
		ru: ru,
		kk: kk,
		en: en,
	}
});