import apiClient from './apiClient.js'

export const checkHealth = async () => {
  const { data } = await apiClient.get('/health')
  return data
}
