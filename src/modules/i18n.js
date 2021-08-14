import { createI18n } from 'vue-i18n'
import store from '@/store'

export default createI18n({
	locale: store.getters['locales/language'],
	messages: {
		ru: {
			ui: {
				'Выход': 'Выход',
				'Вход': 'Вход',
				'ИИН': 'ИИН',
				'Пароль': 'Пароль'
			}
		},
		en: {
			ui: {
				'Выход': 'Logout',
				'Вход': 'Login',
				'ИИН': 'IIN',
				'Пароль': 'Password'
			}
		},
		kz: {
			ui: {
				'Выход': 'Шығу',
				'Вход': 'Кіру',
				'ИИН': 'ЖСН',
				'Пароль': 'Пароль'
			}
		},
	}
});