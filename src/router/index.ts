import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/LoginPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/auth/RegisterPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/',
      component: () => import('@/components/layout/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue'),
        },
        {
          path: 'products',
          name: 'products-list',
          component: () => import('@/pages/products/ProductsListPage.vue'),
        },
        {
          path: 'products/create',
          name: 'products-create',
          component: () => import('@/pages/products/ProductFormPage.vue'),
          meta: { mode: 'create' },
        },
        {
          path: 'products/:id',
          name: 'products-detail',
          component: () => import('@/pages/products/ProductDetailPage.vue'),
        },
        {
          path: 'products/:id/edit',
          name: 'products-edit',
          component: () => import('@/pages/products/ProductFormPage.vue'),
          meta: { mode: 'edit' },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/pages/settings/SettingsPage.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/about/AboutPage.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
  return true
})

export default router
