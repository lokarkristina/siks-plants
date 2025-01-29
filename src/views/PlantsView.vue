<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// utils
import API_URL from '@/utils/constants'
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

// @todo maybe clean up classes more? idk what tailwindy wants
const filterClasses = ['grid', 'items-center', 'gap-1.5']

const getRoomNameById = (id: number, rooms: Room[]): string => {
  const room = rooms.find((room) => room.id === id)
  return room?.name || ''
}

const getPlantTypeNames = (typeIds: number[], types: PlantType[]): string => {
  return typeIds
    .map((id) => types.find((type) => type.id === id)?.name)
    .filter((name) => name)
    .join(', ')
}

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

const fetchPlants = async () => {
  try {
    const response = await fetch(`${API_URL}/db`)
    if (!response.ok) {
      throw new Error('Network response was not ok!')
    }
    // @todo loading
    const data = await response.json()
    // @todo do we separate this? or no call at all, bc so little data?
    // @todo why no refactoring working?
    plants.value = data.allPlants

    rooms.value = data.allRooms
    if (rooms.value.length) {
      rooms.value = [{ id: 0, name: 'Any' }, ...rooms.value]
    }

    plantTypes.value = data.allTypes
  } catch (error) {
    console.error('Error fetching plants:', error)
  } finally {
    // @todo loading
  }
}

onMounted(() => {
  fetchPlants()
})
</script>

<template>
  <div
    class="plants grid grid-cols-[0.25fr_0.65fr_auto] grid-rows-[auto_1fr_auto] items-start gap-x-10 gap-y-5"
  >
    <div class="plants-title-area col-span-full row-[1]">
      <h1>My <span>plants</span></h1>
    </div>

    <!-- @todo add search option (if time) -->

    <!-- filters -->
    <div class="plants-filters col-span-1 row-start-2 row-span-full">
      <div class="plants-filter__header flex justify-between items-center">
        <p class="text-xl">filter by</p>

        <!-- reset all filters -->
        <button
          v-if="selectedRoom !== 0 || !!selectedType.length"
          class="button button--secondary"
          @click="resetFilters"
        >
          reset
        </button>
      </div>

      <div
        v-if="!!rooms.length || !!plantTypes.length"
        class="plants-filter__body grid gap-5 mt-5 border-t-1 border-t-primary/25 p-y-5"
      >
        <!-- filter/room -->
        <div class="plants-filter plants-filter--room" :class="filterClasses">
          <p class="text-lg">Room</p>
          <div class="radio-group">
            <div v-for="room in rooms" :key="room.id" class="radio-item">
              <input type="radio" :id="'room-' + room.id" :value="room.id" v-model="selectedRoom" />
              <label :for="'room-' + room.id">
                {{ room.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- filter/type -->
        <div class="plants-filter plants-filter--type" :class="filterClasses">
          <p class="text-lg">Type</p>
          <div class="checkbox-group">
            <div v-for="type in plantTypes" :key="type.id" class="checkbox-item">
              <input
                type="checkbox"
                :id="`type-${type.id}`"
                :value="type.id"
                v-model="selectedType"
              />
              <label :for="`type-${type.id}`">{{ type.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sorting -->
    <div class="plants-sort col-[3] row-start-2 row-end-3 order-1">
      <!-- reset (by id, default | name | last watered) -->
      <div class="plants-sort__order flex items-center gap-2">
        <label for="sort-order" class="text-xs">Sort by</label>
        <select id="sort-order" @change="onSortChange">
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="lastWatered">Last Watered</option>
        </select>
      </div>
      <!-- @todo change display grid/list (if time) -->
    </div>

    <!-- results -->
    <div
      class="plants-results grid grid-cols-subgrid col-start-2 col-span-full row-start-2 row-span-full gap-x-5 gap-y-2"
    >
      <p class="col-[1/span 2] row-span-1 text-xl">
        Results
        <span class="text-xs text-light">({{ filteredPlants.length }})</span>
      </p>

      <div class="grid col-span-full row-start-2 grid-cols-4 gap-4">
        <!-- plant card, @todo move out -->
        <template v-if="filteredPlants.length">
          <RouterLink
            :to="`/plants/${plant.name.toLowerCase().replace(/ /g, '-')}`"
            v-for="plant in filteredPlants"
            :key="plant.id"
            class="plant-card p-5 border-1 border-primary/25 rounded-md"
          >
            <h2>{{ plant.name }}</h2>
            <p>Watering Frequency: {{ plant.wateringFrequency }}</p>
            <p v-if="!!plant.room">Room: {{ getRoomNameById(plant.room, rooms) }}</p>
            <p v-if="plant.type.length">Type: {{ getPlantTypeNames(plant.type, plantTypes) }}</p>
          </RouterLink>
        </template>
        <p v-else class="text-xl text-center">No plants found. 🪴</p>
      </div>
    </div>
  </div>
</template>
