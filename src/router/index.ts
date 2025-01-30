import { createRouter, createWebHistory } from 'vue-router'
// components
import AboutView from '@/views/AboutView.vue'
// import HomeView from '../views/HomeView.vue'
import PlantsView from '@/views/PlantsView.vue'
import PlantView from '@/views/PlantView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // @todo add the home route, but redirect to /plants
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/',
      name: 'plants',
      component: PlantsView,
    },
    {
      path: '/plants/:id',
      name: 'plant',
      component: PlantView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
