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
				'Номер телефона': 'Номер телефона',
				'Пароль': 'Пароль'
			}
		},
		en: {
			ui: {
				'Выход': 'Logout',
				'Вход': 'Login',
				'ИИН': 'IIN',
				'Номер телефона': 'Phone number',
				'Пароль': 'Password'
			}
		},
		kk: {
			ui: {
				'Выход': 'Шығу',
				'Вход': 'Кіру',
				'ИИН': 'ЖСН',
				'Номер телефона': 'Телефон нөмірі',
				'Пароль': 'Пароль'
			}
		},
	}
});