import * as VueRouter from 'vue-router'
import { useAuthStore } from '@/utility/auth';
import { availableStore } from '@/utility/available';



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
    name: 'itemsbyCategory',
    path: '/supplier/category/:categoryId',
    component: () => import('@/views/menu.vue'),
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
    name: 'itemsBySupplier',
    path: '/supplier/:supplierId/menu',
    component: () => import('@/views/MenuBySupplier.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const available = availableStore()
      if (auth.isLoggedIn) {
        if(!available.isClosed){
        next();}
      } else {
        next({ name: 'login' }); // Redirect to the login route
      }
    }
  },
  {
    name: 'address',
    path: '/address',
    component: () => import('@/views/Address.vue'),
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
    name: 'checkout',
    path: '/checkout',
    component: () => import('@/views/Checkout.vue'),
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
    name: 'myorders',
    path: '/myorders',
    component: () => import('@/views/MyOrders.vue'),
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
    name: 'orderdetails',
    path: '/myorders/:orderId',
    component: () => import('@/views/OrderDetails.vue'),
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
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  }
  
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router
