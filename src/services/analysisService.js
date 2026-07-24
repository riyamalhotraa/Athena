import apiClient from './apiClient.js'

export const startAnalysis = async (datasetId) => {
  const { data } = await apiClient.post('/analysis/start', { dataset_id: datasetId })
  return data
}

export const getAnalysis = async (analysisId) => {
  const { data } = await apiClient.get(`/analysis/${analysisId}`)
  return data
}

export const getAnalysisSummary = async (analysisId) => {
  const { data } = await apiClient.get(`/analysis/${analysisId}/summary`)
  return data
}

export const getAnalysisStatistics = async (analysisId) => {
  const { data } = await apiClient.get(`/analysis/${analysisId}/statistics`)
  return data
}

export const getAnalysisQuality = async (analysisId) => {
  const { data } = await apiClient.get(`/analysis/${analysisId}/quality`)
  return data
}

export const getAnalysisCorrelation = async (analysisId) => {
  const { data } = await apiClient.get(`/analysis/${analysisId}/correlation`)
  return data
}
