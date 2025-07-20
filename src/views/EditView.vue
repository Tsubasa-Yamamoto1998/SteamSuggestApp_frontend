<template>
  <div class="account-edit">
    <h1>アカウント編集</h1>
    <p>※変更しないフォームについては空欄のままにしてください。</p>
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
        <router-link to="/RegisterSteamid" class="help-link">SteamIDの確認方法はこちら</router-link>
      </div>
      <div class="form-group">
        <label for="profileImage">プロフィール画像</label>
        <input type="file" id="profileImage" @change="handleFileChange" />
        <span class="error" v-if="imageError">{{ imageError }}</span>
      </div>
      <button type="submit" id="button">更新</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import apiClient from '@/plugins/axios'
import { useUserStore } from '@/stores/user'

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
    .min(6, 'パスワードは6文字以上にしてください。')
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

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const userStore = useUserStore()
const { value: username, errorMessage: usernameError } = useField('username')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword')
const { value: steamID, errorMessage: steamIDError } = useField('steamID')

const profileImage = ref(null)
const imageError = ref('')
const error = ref('')
const message = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 2 * 1024 * 1024) {
    // 2MB制限
    profileImage.value = file
    imageError.value = ''
  } else {
    imageError.value = '画像サイズは2MB以下にしてください。'
  }
}

// フォーム送信処理
const submitForm = handleSubmit(async (values) => {
  try {
    const formData = new FormData()
    if (values.username) formData.append('user[username]', values.username)
    if (values.email) formData.append('user[email]', values.email)
    if (values.password) formData.append('user[password]', values.password)
    if (values.confirmPassword)
      formData.append('user[password_confirmation]', values.confirmPassword)
    if (values.steamID) formData.append('user[steam_id]', values.steamID)
    if (profileImage.value) formData.append('user[profile_image]', profileImage.value)

    const res = await apiClient.put('/custom/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    message.value = 'アカウント情報を更新しました！'
    userStore.setUser(res.data.user)
  } catch (err) {
    error.value = err.response?.data?.errors?.full_messages?.[0] || '更新に失敗しました。'
    console.error(err)
  }
})
</script>

<style scoped>
.account-edit {
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
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  outline: none; /* フォーカス時のデフォルト枠を削除 */
  border-color: #3b82f6; /* フォーカス時の境界線色を変更 */
  box-shadow: 0 0 4px #3b82f6; /* フォーカス時の視覚効果を追加 */
}

button {
  padding: 10px 16px;
  font-weight: bold;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.message {
  margin-top: 1rem;
  color: green;
}

/* router-link のデフォルトスタイルをリセット */
a {
  text-decoration: none; /* 下線を削除 */
  color: #66c0f4;
}

a:visited {
  color: #66c0f4;
}

.help-link {
  font-size: 14px;
  color: #66c0f4;
  margin-top: 8px;
  display: inline-block;
}

.help-link:hover {
  text-decoration: underline;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .account-edit {
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
  .account-edit {
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
