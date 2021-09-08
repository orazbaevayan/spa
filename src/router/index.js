import { createRouter, createWebHistory } from 'vue-router'
import admin from '@/router/admin'
import manager from '@/router/manager'
import all from '@/router/all'
import store from '@/store'

const routes = [
  ...all,
  ...admin,
  ...manager,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  store.dispatch('ui/clearFocus');
});

export default router
