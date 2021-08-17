import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/modules/router'
import store from '@/store'
import i18n from '@/modules/i18n'
import '@/assets/styles/reset.css'
import '@/assets/styles/styles.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app');