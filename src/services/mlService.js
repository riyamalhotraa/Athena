import apiClient from './apiClient.js'

export const trainModel = async (payload) => {
  const { data } = await apiClient.post('/ml/train', payload)
  return data
}

export const getModels = async () => {
  const { data } = await apiClient.get('/ml/models')
  return data
}

export const getModel = async (modelId) => {
  const { data } = await apiClient.get(`/ml/${modelId}`)
  return data
}

export const predict = async (payload) => {
  const { data } = await apiClient.post('/ml/predict', payload)
  return data
}
