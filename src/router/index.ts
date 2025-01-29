import { createRouter, createWebHistory } from 'vue-router'
// components
import AboutView from '@/views/AboutView.vue'
// import HomeView from '../views/HomeView.vue'
import Plants from '@/views/PlantsView.vue'
import Plant from '@/views/PlantView.vue'
import PlantEdit from '@/components/content/PlantEdit.vue'

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
      component: Plants,
    },
    {
      path: '/plants/:name',
      component: Plant,
      children: [
        {
          path: 'edit',
          name: 'plant-edit',
          component: PlantEdit,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
