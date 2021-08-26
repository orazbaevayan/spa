import { createRouter, createWebHistory } from 'vue-router'
import admin from '@/router/admin'
import all from '@/router/all'
import store from '@/store'

const routes = [
  ...all,
  ...admin
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  store.dispatch('ui/clearFocus');
});

export default router
