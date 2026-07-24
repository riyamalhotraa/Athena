import apiClient from './apiClient.js'

export const generateInsights = async (payload) => {
  const { data } = await apiClient.post('/ai/insights', payload)
  return data
}

export const generateRecommendations = async (payload) => {
  const { data } = await apiClient.post('/ai/recommendations', payload)
  return data
}

export const generatePreprocessingSuggestions = async (payload) => {
  const { data } = await apiClient.post('/ai/preprocessing', payload)
  return data
}
