import { ref } from 'vue'
import API_URL from '../utils/constants'

export function useFetch(url: string) {
  const data = ref<null>(null)
  const loading = ref(true)
  const error = ref<Error | null>(null)

  const fetchData = async () => {
    loading.value = true

    try {
      const response = await fetch(`${API_URL}/${url}`)
      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return { data, loading, error }
}
