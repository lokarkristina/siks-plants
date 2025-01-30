import { ref } from 'vue'
// utils
import API_URL from '../utils/constants'

// @todo add data type
export function usePost(endpoint: string, data: unknown) {
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
      // @todo add proper messages
      alert('🪴 plant added successfully 🪴')
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  postData()

  return { error, loading }
}
