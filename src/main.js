import { createApp, defineAsyncComponent } from 'vue'
import App from '@/App.vue'
import router from '@/modules/router'
import store from '@/store'
import axios from '@/modules/axios'
import i18n from '@/modules/i18n'
import "bootstrap/scss/bootstrap.scss"
import "croppie/croppie.css"
import "bootstrap"
import '@/assets/styles/styles.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)

// Layouts
app.component('MainLayout', defineAsyncComponent(() => import('./views/layouts/MainLayout')))
app.component('DefaultLayout', defineAsyncComponent(() => import('./views/layouts/DefaultLayout')))
app.component('font-awesome-icon', FontAwesomeIcon)

// Components
app.component('Title', defineAsyncComponent(() => import('./components/Title')))
app.component('Card', defineAsyncComponent(() => import('./components/Card')))
app.component('Tabs', defineAsyncComponent(() => import('./components/Tabs')))
app.component('Modal', defineAsyncComponent(() => import('./components/Modal')))
app.component('DeleteModal', defineAsyncComponent(() => import('./components/DeleteModal')))
app.component('EditModal', defineAsyncComponent(() => import('./components/EditModal')))
app.component('CreateModal', defineAsyncComponent(() => import('./components/CreateModal')))
app.component('Pagination', defineAsyncComponent(() => import('./components/Pagination')))
app.component('Exam', defineAsyncComponent(() => import('./components/Exam')))

// Fields
app.component('TextField', defineAsyncComponent(() => import('./components/fields/TextField')))
app.component('DateField', defineAsyncComponent(() => import('./components/fields/DateField')))
app.component('SelectField', defineAsyncComponent(() => import('./components/fields/SelectField')))
app.component('TextSelectField', defineAsyncComponent(() => import('./components/fields/TextSelectField')))
app.component('TextAutocompleteField', defineAsyncComponent(() => import('./components/fields/TextAutocompleteField')))


app.directive('closable', {
	beforeMount(el, binding) {
		el.clickOutsideEvent = (event) => {
			const { handler, exclude } = binding.value;
			let clickedOnExcludedEl = false;
			if(exclude) {
				exclude.forEach(el => {
					let container = document.getElementById(el);
					if (!clickedOnExcludedEl) {
						clickedOnExcludedEl = event.target === container || container.contains(event.target);
					}
				})
			}
			if (!(el === event.target || el.contains(event.target)) && !clickedOnExcludedEl) {
				handler();
			}
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el) {
		document.body.removeEventListener("click", el.clickOutsideEvent);
	}
})

app.mount('#app')

app.config.globalProperties.$axios = axios

app.config.globalProperties.$fetchApiData = (queries) => {
	axios.all(queries).then(r => {
		for (var i = 0; i < r.length; i++) {
			if (r[i].response.status == 200) {
				r[i].save();
			}
		}
	});
}