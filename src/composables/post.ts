import { ref } from 'vue'
// utils
import API_URL from '../utils/constants'
// types
import type { Plant } from '@/types/plant'

export function usePost(endpoint: string, data: Plant) {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const postData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }

      await response.json()
      alert('🪴 Plant added successfully. 🪴')
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  postData()

  return { error, loading }
}
