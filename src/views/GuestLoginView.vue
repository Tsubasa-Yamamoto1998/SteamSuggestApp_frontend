<template>
  <div class="login-form">
    <h2>ゲストログイン</h2>

    <form @submit.prevent="login">
      <div class="form-group">
        <label for="password">READMEに記載のパスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="パスワードを入力"
          required
        />
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit">ゲストログイン</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/plugins/axios'
import { showMessage } from '@/utils/message'

const router = useRouter()
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await apiClient.post('/custom/auth/guest_login', {
      password: password.value,
    })

    if (response.status === 200) {
      showMessage('ゲストログインに成功しました！', 'success') // 成功メッセージを表示
      localStorage.setItem('authToken', response.data.token)
      router.push('/')
    }
  } catch (e) {
    showMessage('ゲストログインに失敗しました。', 'error')
    if (e.response && e.response.status === 401) {
      // 認証エラーの場合
      error.value = 'パスワードが違います'
    } else {
      // その他のエラーの場合
      error.value = 'エラーが発生しました。再度お試しください。'
      console.error('ログインエラー:', e)
    }
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
  font-size: 1rem;
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
    font-size: 0.75rem;
    padding: 7px;
  }

  button {
    font-size: 1rem;
    padding: 8px 14px;
  }
}

@media (max-width: 480px) {
  .login-form {
    padding: 10px;
  }

  input {
    font-size: 0.75rem;
    padding: 6px;
  }

  button {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}
</style>
