import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ProductsView.vue'
import RawMaterialsView from '../views/RawMaterialsView.vue'
import MenuView from '../views/MenuView.vue'
import { useAccountStore } from '@/stores/account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'user details',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/rawmaterials',
      name: 'rawmaterials',
      component: RawMaterialsView
    },
    {
      path: '/products/:id',
      name: 'product details',
      component: () => import('../views/ProductView.vue'),
      props: true
    },
    {
      path: '/rawmaterials/:id',
      name: 'rawmaterial details',
      component: () => import('../views/RawMaterialView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach(async (to) => {
  const store = useAccountStore()
  await store.fetchUser()

  if (to.meta.requiresAuth && !store.user) return '/login'
})

export default router
