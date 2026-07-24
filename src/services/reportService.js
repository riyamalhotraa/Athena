import apiClient from './apiClient.js'

export const generateReport = async (payload) => {
  const { data } = await apiClient.post('/reports/generate', payload)
  return data
}

export const getReports = async (params = {}) => {
  const { data } = await apiClient.get('/reports', { params })
  return data
}

export const getReport = async (reportId) => {
  const { data } = await apiClient.get(`/reports/${reportId}`)
  return data
}

export const downloadReport = async (reportId) => {
  const { data } = await apiClient.get(`/reports/${reportId}/download`, {
    responseType: 'blob',
  })
  return data
}

export const deleteReport = async (reportId) => {
  const { data } = await apiClient.delete(`/reports/${reportId}`)
  return data
}
