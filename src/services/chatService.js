// import apiClient from './apiClient.js'

// export const chatWithAthena = async (message) => {
//   const { data } = await apiClient.post('/chat', { message })
//   return data
// }

// export const getChatHistory = async () => {
//   const { data } = await apiClient.get('/chat/history')
//   return data
// }

// export const clearChatHistory = async () => {
//   const { data } = await apiClient.delete('/chat/history')
//   return data
// }

import apiClient from "./apiClient";

export const chatWithAthena = async (datasetId, message) => {
  console.log("CHAT DATASET ID:", datasetId);
  
  const { data } = await apiClient.post('/chat/', {
    dataset_id: datasetId,
    message,
  })

  return data
}

export const getChatHistory = async () => {
  const { data } = await apiClient.get("/chat/history");
  return data;
};

export const clearChatHistory = async () => {
  const { data } = await apiClient.delete("/chat/history");
  return data;
};