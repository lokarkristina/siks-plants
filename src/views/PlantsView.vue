<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
// composables
import { useFetch } from '@/composables/fetch.ts'
// types
import type { Plant } from '@/types/plant'
import type { Room } from '@/types/room'
import type { PlantType } from '@/types/plantType'

const plants = ref<Plant[]>([])
const rooms = ref<Room[]>([])
const plantTypes = ref<PlantType[]>([])
const searchText = ref('')
const selectedRoom = ref(0)
const selectedType = ref<number[]>([])

const filterClasses = ['grid', 'items-center', 'gap-1.5', 'mt-3']
const buttonClasses = [
  'inline-block',
  'py-1',
  'px-2',
  'text-xs',
  'text-center',
  'text-accent',
  'hover:text-dark',
  'focus:ring-1',
  'focus:outline-none',
  'focus:ring-primary',
  'transition-color',
]

const filteredPlants = computed(() => {
  if (searchText.value) {
    return plants.value.filter((plant: Plant) =>
      plant.name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }

  return plants.value.filter((plant: Plant) => {
    if (selectedRoom.value || !!selectedType.value.length) {
      return (
        selectedRoom.value === plant.room ||
        plant.type.some((type) => selectedType.value.includes(type))
      )
    } else {
      return plants.value
    }
  })
})

const onSortChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  switch (value) {
    case 'name':
      plants.value.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'lastWatered':
      plants.value.sort(
        (a, b) => new Date(b.lastWatered).getTime() - new Date(a.lastWatered).getTime(),
      )
      break
    default:
      plants.value.sort((a, b) => a.id - b.id)
      break
  }
}

const resetFilters = () => {
  searchText.value = ''
  selectedRoom.value = 0
  selectedType.value = []
}

const fetchPlants = () => {
  const { data, loading, error } = useFetch('db')

  watchEffect(() => {
    if (!loading.value && data.value) {
      plants.value = data.value.allPlants ?? []
      rooms.value = [{ id: 0, name: 'Any' }, ...(data.value.allRooms ?? [])]
      plantTypes.value = data.value.allTypes ?? []
    }

    if (error.value) {
      console.error('Error fetching plants:', error.value)
    }
  })
}

onMounted(() => {
  fetchPlants()
})
</script>

<template>
  <div
    class="plants grid grid-cols-[1fr_auto] md:grid-cols-[0.25fr_0.65fr_auto] md:grid-rows-[auto_1fr_auto] items-start gap-x-10 gap-y-5"
  >
    <div class="plants-title-area col-span-full row-[1]">
      <h1>my <span>plants</span></h1>
    </div>

    <!-- filters -->
    <div class="plants-filters col-span-full md:col-span-1 row-start-2">
      <div class="plants-filter__header flex justify-between items-center">
        <p class="text-md">filter by</p>

        <!-- reset all filters -->
        <button
          type="button"
          v-if="selectedRoom !== 0 || !!selectedType.length"
          :class="buttonClasses"
          @click="resetFilters"
        >
          reset
        </button>
      </div>

      <div
        v-if="!!rooms.length || !!plantTypes.length"
        class="plants-filter__body grid grid-cols-2 md:grid-cols-[auto] gap-5 mt-5 border-t-1 border-t-primary/25 p-y-5"
      >
        <!-- filter/room -->
        <div class="plants-filter plants-filter--room" :class="filterClasses">
          <p class="text-md">Room</p>
          <div class="radio-group">
            <div v-for="room in rooms" :key="room.id" class="radio-item">
              <input type="radio" :id="'room-' + room.id" :value="room.id" v-model="selectedRoom" />
              <label :for="'room-' + room.id" class="inline-block ms-1.5">
                {{ room.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- filter/type -->
        <div class="plants-filter plants-filter--type" :class="filterClasses">
          <p class="text-md">Type</p>
          <div class="checkbox-group">
            <div v-for="type in plantTypes" :key="type.id" class="checkbox-item">
              <input
                type="checkbox"
                :id="`type-${type.id}`"
                :value="type.id"
                v-model="selectedType"
              />
              <label :for="`type-${type.id}`" class="inline-block ms-1.5">{{ type.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sorting -->
    <div class="plants-sort col-span-full md:col-[3] row-start-2 row-end-3 order-1">
      <!-- reset (by id, default | name | last watered) -->
      <div class="plants-sort__order flex items-center justify-end gap-2">
        <label for="sort-order" class="block text-xs text-dark/80">sort by</label>
        <select
          id="sort-order"
          class="border-b-2 border-primary/60 text-dark/80 text-sm focus:border-prrimary/80 block px-1 py-0.5"
          @change="onSortChange"
        >
          <option value="default">default</option>
          <option value="name">name</option>
          <option value="lastWatered">last watered</option>
        </select>
      </div>
    </div>

    <!-- results -->
    <!-- @todo add loader, transitions -->
    <div
      class="plants-results grid grid-cols-subgrid col-span-full md:col-start-2 md:row-start-2 md:row-span-full gap-x-5 gap-y-3 md:gap-y-10"
    >
      <p class="col-[1/span 2] row-span-1 text-xl">
        results
        <span class="text-xs text-primary/80">
          ({{ filteredPlants.length }})
        </span>
      </p>

      <div class="grid col-span-full row-start-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- @todo add proper styling, move to separate file if needed -->
        <template v-if="filteredPlants.length">
          <RouterLink
            :to="`/plants/${plant.id}`"
            v-for="plant in filteredPlants"
            :key="plant.id"
            class="plant-card border border-primary/30 rounded-md overflow-hidden hover:border-primary/50 hover:shadow-lg transition-shadow duration-200"
          >
            <img
              :src="plant.image"
              :alt="`${plant.name} plant image`"
              class="w-full h-32 object-cover mb-2"
            />
            <h2 class="p-3 md:p-5">{{ plant.name }}</h2>
          </RouterLink>
        </template>
        <p v-else class="text-md md:text-3xl text-center color-dark font-logo">
          No plants found. 🪴
        </p>
      </div>
    </div>
  </div>
</template>
