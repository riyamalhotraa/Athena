import apiClient from './apiClient.js'

// export const getDashboardStats = async () => {
//   const { data } = await apiClient.get('/dashboard/stats')
//   return data
// }

export const getDashboardStats = async () => {
    const response = await apiClient.get("/analysis/dashboard");
    return response.data;
};