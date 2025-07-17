import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_KEY,
  withCredentials: true, // クッキーや認証情報を含める
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // タイムアウトを10秒に設定
})

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    // 必要に応じてリクエスト前に処理を追加
    return config
  },
  (error) => {
    // リクエストエラー処理
    console.error('リクエストエラー:', error)
    return Promise.reject(error)
  },
)

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    // レスポンスが正常な場合の処理
    return response
  },
  (error) => {
    // エラー処理
    if (error.code === 'ECONNABORTED') {
      console.error('タイムアウトエラー:', error)
    } else if (error.response) {
      console.error('レスポンスエラー:', error.response.status, error.response.data)
    } else {
      console.error('その他のエラー:', error.message)
    }
    return Promise.reject(error)
  },
)

export default apiClient
