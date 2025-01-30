import { createRouter, createWebHistory } from 'vue-router'
// components
import AddPlantView from '@/views/AddPlantView.vue'
import PlantView from '@/views/PlantView.vue'
import PlantsView from '@/views/PlantsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/plants/add',
      name: 'add-plant',
      component: AddPlantView,
    },
  ],
})

export default router
