import { ref, watchEffect, type Ref } from 'vue'
import { useFetch } from '@/composables/fetch'
import type { Room } from '@/types/room'

export function useRoom(roomId: number) {
  const room = ref<string | null>(null)
  const { data }: { data: Ref<Room | null> } = useFetch<Room>(`allRooms/${roomId}`)

  watchEffect(() => {
    room.value = data.value?.name || null
  })

  return { room }
}
