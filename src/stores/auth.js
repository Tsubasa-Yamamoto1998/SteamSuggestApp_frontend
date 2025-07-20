import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/plugins/axios.js' // Axios インスタンスをインポート
import { showMessage } from '@/utils/message' // showMessageをインポート

export const useAuthCookie = defineStore('auth', () => {
  const token = ref(null)
  const name = ref(null)
  const isLoggedIn = ref(false)
  const isSteamID = ref(false) // steam_id の有無を管理

  const checkAuth = async () => {
    try {
      // Rails 側のエンドポイントを呼び出して認証状態を確認
      const response = await apiClient.get('/custom/sessions/check_auth')

      // レスポンスから認証状態とユーザー情報を取得
      const { is_logged_in, is_steam_id, user } = response.data

      if (is_logged_in) {
        // 認証成功時の状態更新
        token.value = 'valid' // トークンはサーバー側で管理されるため、ここではダミー値
        name.value = user.name
        isLoggedIn.value = true
        isSteamID.value = is_steam_id // steam_id の有無を更新
      } else {
        // 認証失敗時の状態リセット
        token.value = null
        name.value = null
        isLoggedIn.value = false
        isSteamID.value = false
      }
    } catch (error) {
      console.error('認証確認中にエラーが発生しました:', error)
      // エラー時の状態リセット
      token.value = null
      name.value = null
      isLoggedIn.value = false
      isSteamID.value = false
    }
  }

  const logout = async () => {
    try {
      await apiClient.delete('/custom/sessions/logout') // Rails のエンドポイントを呼び出す

      showMessage('ログアウトしました。', 'success') // 成功メッセージを表示
      token.value = null
      name.value = null
      isLoggedIn.value = false
    } catch (error) {
      showMessage('ログアウトに失敗しました。', 'error') // エラーメッセージを表示
      console.error('ログアウト中にエラーが発生しました:', error)
    }
  }

  return {
    token,
    name,
    isLoggedIn,
    isSteamID,
    checkAuth,
    logout,
  }
})
