<template>
  <div class="signup-form">
    <h2>新規登録</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input v-model="form.username" type="text" id="username" required />
      </div>

      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input v-model="form.password" type="password" id="password" required minlength="6" />
      </div>

      <div class="form-group">
        <label for="confirmPassword">パスワード確認</label>
        <input v-model="form.confirmPassword" type="password" id="confirmPassword" required />
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">登録する</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')

const submitForm = () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = 'パスワードが一致しません。'
    return
  }

  if (form.password.length < 6) {
    error.value = 'パスワードは6文字以上にしてください。'
    return
  }

  // API連携の例（後でRailsと接続）
  console.log('登録フォーム送信', form)

  // ここでバックエンドと通信したり、画面遷移したりできます
}
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
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
.error {
  color: red;
  margin-bottom: 10px;
}
</style>
