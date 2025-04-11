import { createRouter, createWebHistory } from '@ionic/vue-router';
import Menu from '../components/Menu.vue'

const routes = [
  {
    path: '/',
    redirect: '/pages/home'
  },
  {
    path: '/pages/',
    component: Menu,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'order',
        component: () => import('@/views/OrderNow.vue')
      },
      {
        path: 'loyalty',
        component: () => import('@/views/LoyaltyPoints.vue')
      },
      {
        path: 'item/:id',
        name: 'items',
        component: () => import('@/views/Item.vue'),
        props: true
      },
      {
        path: 'addTo/:id',
        name: 'addTo',
        component: () => import('@/views/OrderBag.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
