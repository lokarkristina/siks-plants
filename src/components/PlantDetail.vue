<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
// composables
import { useFetch } from '@/composables/fetch'
import { useRoom } from '@/composables/room'
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

onMounted(() => {
  fetchPlant()
})
</script>

<template>
  <!-- @todo add proper styling -->
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{ error.message }}</div>
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
</template>
