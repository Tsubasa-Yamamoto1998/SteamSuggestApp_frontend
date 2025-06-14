import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_KEY,
  withCredentials: true, // クッキーや認証情報を含める
  headers: {
    'Content-Type': 'application/json',
  },
})
export default apiClient
