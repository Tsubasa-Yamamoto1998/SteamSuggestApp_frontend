<template>
  <div class="login-form">
    <h2>ログイン</h2>
    <p>
      アカウントをお持ちでない方は<br />
      <router-link to="/signup">新規登録</router-link>してください。
    </p>

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
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authCookie = useAuthCookie()
const userStore = useUserStore()

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
      userStore.setUser(response.data.user)
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
.login-form {
  max-width: 400px;
  margin: 0 auto;
  color: white;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 10px 16px;
  font-weight: bold;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
}

a {
  color: #66c0f4;
  text-decoration: none;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .login-form {
    max-width: 90%;
    padding: 15px;
  }

  input {
    font-size: 13px;
    padding: 7px;
  }

  button {
    font-size: 14px;
    padding: 8px 14px;
  }
}

@media (max-width: 480px) {
  .login-form {
    padding: 10px;
  }

  input {
    font-size: 12px;
    padding: 6px;
  }

  button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
