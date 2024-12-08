import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: () => import('../views/RecipieView.vue'),
    },
    {
      path: '/your-recipes',
      name: 'Your recipes',
      component: () => import('../views/YourRecipesView.vue'),
    },
  ],
})

export default router
