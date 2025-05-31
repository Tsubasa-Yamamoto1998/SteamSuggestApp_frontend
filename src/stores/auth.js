import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/plugins/axios.js' // Axios インスタンスをインポート

export const useAuthCookie = defineStore('auth', () => {
  const token = ref(null)
  const name = ref(null)
  const isLoggedIn = ref(false)

  const checkAuth = async () => {
    try {
      const response = await apiClient.get('/custom/sessions/check_auth') // Rails のエンドポイントを呼び出す
      const { is_logged_in, user } = response.data

      if (is_logged_in) {
        token.value = 'valid' // トークンの値はバックエンドで管理されるため、ここではダミー
        name.value = user.name
        isLoggedIn.value = true
      } else {
        token.value = null
        name.value = null
        isLoggedIn.value = false
      }
    } catch (error) {
      console.error('認証確認中にエラーが発生しました:', error)
      token.value = null
      name.value = null
      isLoggedIn.value = false
    }
  }

  const logout = async () => {
    try {
      await apiClient.delete('/custom/sessions/logout') // Rails のエンドポイントを呼び出す

      alert('ログアウト成功')
      token.value = null
      name.value = null
      isLoggedIn.value = false
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error)
    }
  }

  return {
    token,
    name,
    isLoggedIn,
    checkAuth,
    logout,
  }
})
