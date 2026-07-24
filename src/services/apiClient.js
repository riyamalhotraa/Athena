import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the auth token (if present) to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('athena_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Centralized error handling. Extend this to trigger a logout on 401s,
// show toasts, etc. once those systems exist.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[Athena API] ${error.response.status} ${error.config?.url}`, error.response.data)
    } else {
      console.error('[Athena API] Network or CORS error', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
