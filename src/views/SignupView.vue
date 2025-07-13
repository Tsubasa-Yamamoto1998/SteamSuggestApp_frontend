<template>
  <div class="signup-form">
    <h2>新規登録</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input v-model="username" type="text" id="username" />
        <span v-if="usernameError" class="validation-error">{{ usernameError }}</span>
      </div>

      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input v-model="email" type="email" id="email" />
        <span v-if="emailError" class="validation-error">{{ emailError }}</span>
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input v-model="password" type="password" id="password" />
        <span v-if="passwordError" class="validation-error">{{ passwordError }}</span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">パスワード確認</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" />
        <span v-if="confirmPasswordError" class="validation-error">{{ confirmPasswordError }}</span>
      </div>

      <p v-if="error?.value" class="error">{{ error?.value }}</p>
      <button type="submit">新規登録</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import apiClient from '@/plugins/axios' // apiClientをインポート
import { showMessage } from '@/utils/message' // showMessageをインポート

// バリデーションスキーマを定義
const schema = yup.object({
  username: yup.string().required('ユーザー名を入力してください。'),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '正しいメールアドレスを入力してください。')
    .required('メールアドレスを入力してください。'),
  password: yup
    .string()
    .min(
      6,
      'パスワードは6文字以上にしてください。英大文字、小文字、数字、特殊文字を含めてください。',
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'パスワードは英大文字、小文字、数字、特殊文字を含めてください。',
    )
    .required('パスワードを入力してください。'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'パスワードが一致しません。')
    .required('パスワード確認を入力してください。'),
})

// フォームのセットアップ
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// 各フィールドのセットアップ
const { value: username, errorMessage: usernameError } = useField('username')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword')

const error = ref('default error message')
const router = useRouter()

// フォーム送信処理
const submitForm = handleSubmit(async (values) => {
  console.log('🟢 handleSubmit 内に入りました', values)
  try {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      confirm_success_url: import.meta.env.VITE_APP_CONFIRM_SUCCESS_URL,
    }
    console.log('🟢 APIリクエストデータ:', data)
    // APIリクエストを送信

    await apiClient.post('/auth', data)
    console.log('通ったよ')
    if (import.meta.env.MODE === 'test') {
      console.log('apiClient mock calls:', apiClient.post?.mock?.calls)
    }
    // 成功メッセージを表示
    showMessage('メールアドレスに認証メールを送信しました！', 'success')
    router.push('/')
  } catch (err) {
    // エラーメッセージを表示
    showMessage('登録に失敗しました。', 'error')
    error.value = err.response?.data?.errors?.full_messages?.[0] || '登録に失敗しました。'
  }
})
</script>

<style scoped>
.signup-form {
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

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .signup-form {
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
  .signup-form {
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
