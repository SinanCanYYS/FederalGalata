import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import SuppliersView from '../views/SuppliersView.vue'
import AddSupplierView from '../views/AddSupplierView.vue'
import ProductsView from '../views/ProductsView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import AddProductView from '../views/AddProductView.vue'
import RawMaterialsView from '../views/RawMaterialsView.vue'
import AddRawMaterialView from '../views/AddRawMaterialView.vue'
import MenuView from '../views/MenuView.vue'
import PurchasesView from '../views/PurchasesView.vue'
import SettingsView from '../views/SettingsView.vue'
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
      path: '/suppliers',
      name: 'suppliers',
      component: SuppliersView
    },
    {
      path: '/suppliers/newsupplier',
      name: 'new supplier',
      component: AddSupplierView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/newproduct',
      name: 'new product',
      component: AddProductView
    },
    {
      path: '/products/:id/recipe',
      name: 'addRecipe',
      component: AddRecipeView
    },
    {
      path: '/rawmaterials',
      name: 'rawmaterials',
      component: RawMaterialsView
    },
    {
      path: '/rawmaterials/newrawmaterial',
      name: 'new rawMaterial',
      component: AddRawMaterialView
    },
    // {
    //   path: '/products/:id',
    //   name: 'product details',
    //   component: () => import('../views/ProductView.vue'),
    //   props: true
    // },
    // {
    //   path: '/products/:productId/recipes/:recipeId',
    //   name: 'recipe details',
    //   component: () => import('../views/RecipeDetailView.vue'),
    //   props: true
    // },
    {
      path: '/rawmaterials/:id',
      name: 'rawmaterial details',
      component: () => import('../views/RawMaterialView.vue')
    },
    {
      path: '/suppliers/:id',
      name: 'supplier details',
      component: () => import('../views/SupplierView.vue')
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: PurchasesView
    },
    {
      path: '/purchases/:id',
      name: 'purchase detail',
      component: () => import('../views/PurchaseDetailView.vue')
    },
    {
      path: '/purchases/newpurchase',
      name: 'new purchase',
      component: () => import('../views/NewPurchaseView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
router.beforeEach(async (to) => {
  const store = useAccountStore()
  await store.fetchUser()

  if (to.meta.requiresAuth && !store.user) return '/login'
})

export default router
