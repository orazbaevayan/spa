import { createRouter, createWebHistory } from 'vue-router'
import admin from '@/router/admin'
import all from '@/router/all'

const routes = [
  ...all,
  ...admin
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
