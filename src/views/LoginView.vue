<template>
  <div class="login">
    <h2>ログイン</h2>
    <p>登録済みのアカウントでログインしましょう。</p>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="メールアドレスを入力"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="パスワードを入力"
          required
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import { showMessage } from '@/utils/message' // showMessageをインポート
import apiClient from '@/plugins/axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authCookie = useAuthCookie()

const handleLogin = async () => {
  try {
    // ログインAPIエンドポイントにリクエストを送信
    const response = await apiClient.post('/auth/sign_in', {
      email: email.value,
      password: password.value,
    })

    // レスポンスが成功の場合
    if (response.status === 200) {
      showMessage('ログインに成功しました！', 'success') // 成功メッセージを表示

      // 認証状態を更新
      await authCookie.checkAuth()

      // steam_id の有無でルーティングを分岐
      if (authCookie.isSteamID) {
        router.push('/') // steam_id が登録済みの場合
      } else {
        router.push('/RegisterSteamid') // steam_id が未登録の場合
      }
    }
  } catch (error) {
    showMessage('ログインに失敗しました。', 'error') // エラーメッセージを表示
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'メールアドレスまたはパスワードが間違っています。'
    } else {
      errorMessage.value = 'ログイン中にエラーが発生しました。'
    }
    console.error(error)
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
