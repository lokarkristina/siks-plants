<script setup lang="ts">
import { ref } from 'vue'
// composables
import { usePost } from '@/composables/post'
// types
import type { Plant } from '@/types/plant'

// predefine some values to reduce the amount of typing
const newPlant = ref<Plant>({
  id: Math.floor(Math.random() * 10000),
  name: '',
  image: './src/assets/plant.jpg',
  lastWatered: new Date(),
  prefers: '',
  room: Math.floor(Math.random() * 3),
  type: [2],
  wateringFrequency: '',
})

const addPlant = () => {
  console.log('Plant added:', newPlant.value)
  usePost('allPlants', newPlant.value)
}

// styling, but so much classes ...
const labelClasses = ['block', 'mb-2', 'text-sm', 'text-dark/60']
const inputClasses = [
  'block',
  'w-full',
  'py-2',
  'px-3',
  'border',
  'border-dark/20',
  'rounded-md',
  'text-black',
  'text-md',
  'focus:border-primary',
]
const buttonClasses = [
  'block',
  'mt-3',
  'p-2',
  'border-2',
  'border-accent',
  'rounded-sm',
  'text-accent',
  'text-md',
  'font-bold',
  'hover:bg-accent',
  'hover:text-white',
  'focus:border-accent',
  'transition',
  'duration-200',
]
</script>

<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-4xl md:text-6xl">add <span>new plant</span></h1>

    <!-- @todo validation -->
    <form @submit.prevent="addPlant" role="form">
      <div>
        <label for="name" :class="labelClasses">name</label>
        <input
          id="name"
          v-model="newPlant.name"
          type="text"
          :class="inputClasses"
          aria-label="Plant name"
          required
        />
      </div>

      <div>
        <label for="prefers" :class="labelClasses">plant prefers</label>
        <input
          id="prefers"
          v-model="newPlant.prefers"
          type="text"
          :class="inputClasses"
          aria-label="Plant prefers"
          required
        />
      </div>

      <div>
        <label for="wateringFrequency" :class="labelClasses">watering frequency</label>
        <input
          id="wateringFrequency"
          v-model="newPlant.wateringFrequency"
          type="text"
          :class="inputClasses"
          aria-label="Watering frequency"
          required
        />
      </div>

      <!-- submit button -->
      <div class="flex justify-end">
        <!-- @todo text is weirdly positioned, figure out why -->
        <button type="submit" :class="buttonClasses" aria-label="Add plant">add plant</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
div + div {
  margin-top: calc(var(--spacing) * 4);
}
</style>
