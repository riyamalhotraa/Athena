import apiClient from './apiClient.js'

export const uploadDataset = async (file, onUploadProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await apiClient.post('/datasets/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })
  return data
}

export const getDatasets = async (params = {}) => {
  const { data } = await apiClient.get('/datasets', { params })
  return data
}

export const getDataset = async (datasetId) => {
  const { data } = await apiClient.get(`/datasets/${datasetId}`)
  return data
}

export const deleteDataset = async (datasetId) => {
  const { data } = await apiClient.delete(`/datasets/${datasetId}`)
  return data
}

export const getDatasetPreview = async (datasetId) => {
  const { data } = await apiClient.get(`/datasets/${datasetId}/preview`)
  return data
}
