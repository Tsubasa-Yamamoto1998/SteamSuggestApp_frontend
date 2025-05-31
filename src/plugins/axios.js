import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // クッキーや認証情報を含める
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプター ローカルストレージに保存する形からクッキーに保存するシステムに変更したため、以下のコードはコメントアウトしています。
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access-token')
//   const client = localStorage.getItem('client')
//   const uid = localStorage.getItem('uid')

//   if (token && client && uid) {
//     config.headers['access-token'] = token
//     config.headers['client'] = client
//     config.headers['uid'] = uid
//   }

//   return config
// })

// apiClient.interceptors.response.use((response) => {
//   const token = response.headers['access-token']
//   const client = response.headers['client']
//   const uid = response.headers['uid']

//   if (token && client && uid) {
//     localStorage.setItem('access-token', token)
//     localStorage.setItem('client', client)
//     localStorage.setItem('uid', uid)
//   }

//   return response
// })

export default apiClient
