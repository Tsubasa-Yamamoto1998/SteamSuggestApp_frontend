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

      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">登録する</button>
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

const error = ref('')
const router = useRouter()

// フォーム送信処理
const submitForm = handleSubmit(async (values) => {
  try {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      confirm_success_url: import.meta.env.VUE_APP_CONFIRM_SUCCESS_URL,
    }
    // APIリクエストを送信
    await apiClient.post('/auth', data)

    // 成功メッセージを表示
    showMessage('メールアドレスに認証メールを送信しました！', 'success')
    router.push('/')
  } catch (err) {
    // エラーメッセージを表示
    showMessage('登録に失敗しました。', 'error')
    error.value = err.response?.data?.errors?.full_messages?.[0] || '登録に失敗しました。'
    console.error(err)
  }
})
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
  color: red; /* エラーメッセージを赤色に設定 */
  margin-top: 4px; /* メッセージと入力欄の間隔を調整 */
  font-size: 12px; /* メッセージのフォントサイズを調整 */
}
.validation-error {
  color: red; /* バリデーションエラーメッセージを赤色に設定 */
  font-size: 12px; /* メッセージのフォントサイズを調整 */
  margin-top: 4px; /* メッセージと入力欄の間隔を調整 */
}
</style>
