import { ref, watchEffect } from 'vue'
import { useFetch } from '@/composables/fetch'

export function useRoom(roomId: number) {
  const room = ref<string | null>(null)
  const { data } = useFetch(`allRooms/${roomId}`)

  watchEffect(() => {
    if (data.value) {
      room.value = data.value.name
    }
  })

  return { room }
}
