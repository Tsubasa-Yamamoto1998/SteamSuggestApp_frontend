<template>
  <div class="account-edit">
    <h1>アカウント編集</h1>
    <br />
    <small>※変更しないフォームについては空欄のままにしてください。</small>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" v-model="username" placeholder="変更しない場合は空欄" />
        <span class="error" v-if="usernameError">{{ usernameError }}</span>
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="email" placeholder="変更しない場合は空欄" />
        <span class="error" v-if="emailError">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="変更しない場合は空欄"
        />
        <span class="error" v-if="passwordError">{{ passwordError }}</span>
      </div>
      <div class="form-group">
        <label for="confirmPassword">パスワード確認</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="変更しない場合は空欄"
        />
        <span class="error" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
      </div>
      <div class="form-group">
        <label for="steamID">SteamID</label>
        <input type="text" id="steamID" v-model="steamID" placeholder="変更しない場合は空欄" />
        <span class="error" v-if="steamIDError">{{ steamIDError }}</span>
      </div>
      <button type="submit">更新</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import apiClient from '@/plugins/axios'

// バリデーションスキーマを定義
const schema = yup.object({
  username: yup.string().nullable(),
  email: yup
    .string()
    .nullable()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '正しいメールアドレスを入力してください。'),
  password: yup
    .string()
    .nullable()
    .min(
      6,
      'パスワードは6文字以上にしてください。英大文字、小文字、数字、特殊文字を含めてください。',
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'パスワードは英大文字、小文字、数字、特殊文字を含めてください。',
    ),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password')], 'パスワードが一致しません。'),
  steamID: yup.string().nullable(),
})

export default {
  name: 'AccountView',
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: schema,
    })

    const { value: username, errorMessage: usernameError } = useField('username')
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')
    const { value: confirmPassword, errorMessage: confirmPasswordError } =
      useField('confirmPassword')
    const { value: steamID, errorMessage: steamIDError } = useField('steamID')

    const error = ref('')
    const message = ref('')

    // フォーム送信処理
    const submitForm = handleSubmit(async (values) => {
      try {
        const data = {
          username: values.username || undefined,
          email: values.email || undefined,
          password: values.password || undefined,
          password_confirmation: values.confirmPassword || undefined,
          steamID: values.steamID || undefined,
        }
        await apiClient.put('/custom/users', data)
        message.value = 'アカウント情報を更新しました！'
      } catch (err) {
        error.value = err.response?.data?.errors?.full_messages?.[0] || '更新に失敗しました。'
        console.error(err)
      }
    })

    return {
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      steamID,
      steamIDError,
      error,
      message,
      submitForm,
    }
  },
}
</script>

<style scoped>
.account-edit {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1rem;
}
.error {
  color: red;
  font-size: 0.875rem;
}
.message {
  margin-top: 1rem;
  color: green;
}
</style>
