import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // クッキーや認証情報を含める
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
