import { createApp, defineAsyncComponent } from 'vue'
import App from '@/App.vue'
import router from '@/modules/router'
import store from '@/store'
import axios from '@/modules/axios'
import i18n from '@/modules/i18n'
import '@/assets/styles/reset.css'
import '@/assets/styles/styles.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)

app.component('MainLayout', defineAsyncComponent(() => import('./views/layouts/MainLayout')))
app.component('DefaultLayout', defineAsyncComponent(() => import('./views/layouts/DefaultLayout')))

app.mount('#app')


app.config.globalProperties.$axios = axios