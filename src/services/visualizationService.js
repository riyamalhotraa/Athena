import apiClient from './apiClient.js'

export const generateVisualization = async (payload) => {
  const { data } = await apiClient.post('/visualizations/generate', payload)
  return data
}

export const getVisualizations = async (datasetId) => {
  const { data } = await apiClient.get(`/visualizations/${datasetId}`)
  return data
}

export const downloadChart = async (chartId) => {
  const { data } = await apiClient.get(`/visualizations/download/${chartId}`, {
    responseType: 'blob',
  })
  return data
}
