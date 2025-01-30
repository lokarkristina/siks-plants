<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
// composables
import { useFetch } from '@/composables/fetch'
import { useRoom } from '@/composables/room'
import { useDelete } from '@/composables/delete'
// types
import type { Plant } from '@/types/plant'

const route = useRoute()
const plantId = +route.params.id

const plant = ref<Plant | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)
const roomName = ref<string | null>(null)

const fetchPlant = () => {
  const { data, loading: fetchLoading, error: fetchError } = useFetch(`allPlants/${plantId}`)

  watchEffect(() => {
    loading.value = fetchLoading.value
    error.value = fetchError.value

    if (data.value) {
      plant.value = data.value as Plant
      if (plant.value.room) {
        fetchRoomName(plant.value.room)
      }
    }
  })
}

const fetchRoomName = (roomId: number) => {
  const { room } = useRoom(roomId)

  watchEffect(() => {
    if (room.value) {
      roomName.value = room.value
    }
  })
}

const deletePlant = (plantId: number) => {
  useDelete(plantId)
}

onMounted(() => {
  fetchPlant()
})

// classes
// @todo this should be reused,
// bc it's in other components also
const buttonClasses = [
  'block',
  'mt-3',
  'p-2',
  'border-2',
  'border-error',
  'rounded-sm',
  'text-error',
  'text-md',
  'font-bold',
  'uppercase',
  'hover:bg-error',
  'hover:text-white',
  'focus:border-error',
  'transition',
  'duration-200',
]
</script>

<template>
  <!-- @todo add proper styling -->
  <!-- loading -->
  <div v-if="loading" class="loading">Loading...</div>
  <!-- log error message -->
  <div v-if="error" class="error">{{ error.message }}</div>

  <!-- plant information -->
  <div v-if="plant && !loading && !error" class="plant">
    <h1>{{ plant.name }}</h1>

    <div class="plant-details">
      <p><strong>Watering frequency:</strong> {{ plant.wateringFrequency }}</p>
      <p>
        <strong>Location: </strong>
        <span>{{ roomName }}</span>
      </p>
      <p><strong>Prefers:</strong> {{ plant.prefers }}</p>
      <p><strong>Last Watered:</strong> {{ plant.lastWatered }}</p>
      <p><strong>Notes:</strong> {{ plant.notes }}</p>
      <p><strong>Type:</strong> {{ plant.type }}</p>
    </div>
  </div>

  <div class="border-t border-primary/60 mt-20 py-10">
    <span class="block mb-5 text-dark/60 text-xs">actions</span>
    <!-- delete the plant -->
    <button type="button" :class="buttonClasses" @click="deletePlant(plant?.id)">
      {{ `delete ${plant?.name}` }}
    </button>
  </div>
</template>
