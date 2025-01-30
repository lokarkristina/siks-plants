import { ref } from 'vue'
// utils
import API_URL from '@/utils/constants'
import router from '@/router'

export function useDelete(id: number) {
  const isDeleting = ref<boolean>(false)
  const error = ref<Error | null>(null)

  const deleteItem = async () => {
    isDeleting.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/allPlants/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      alert('Plant deleted succesfully. 🪴')
    } catch (err) {
      error.value = err as Error
    } finally {
      isDeleting.value = false
      router.push('/')
    }
  }

  deleteItem()

  return {
    isDeleting,
    error,
  }
}
