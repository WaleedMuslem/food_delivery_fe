import * as VueRouter from 'vue-router'
import { useAuthStore } from '@/utility/auth'; // Assuming you're using Pinia


const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isLoggedIn) {
        next();
      } else {
        next(from.fullPath);

      }
    }
  },
  {
    path: '/sginup',
    name: 'sginup',
    component: () => import('@/views/Sginup.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isLoggedIn) {
        next();
      } else {
        next(from.fullPath);

      }
    }
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/SyppliersList.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn) {
        next();
      } else {
        next({ name: 'login' }); // Redirect to the login route
      }
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router
