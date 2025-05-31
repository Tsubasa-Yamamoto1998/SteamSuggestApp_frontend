<template>
  <div class="register-steamid">
    <h2>SteamIDを登録</h2>
    <p>SteamIDを入力して登録してください。</p>
    <form @submit.prevent="registerSteamID">
      <div class="form-group">
        <label for="steamID">SteamID</label>
        <input type="text" id="steamID" v-model="steamID" placeholder="SteamIDを入力" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">登録</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/plugins/axios' // apiClientをインポート

const steamID = ref('')
const errorMessage = ref('')
const router = useRouter()

const registerSteamID = async () => {
  try {
    // SteamID登録APIエンドポイントにリクエストを送信
    const response = await apiClient.post(
      '/custom/steam/register',
      { steamID: steamID.value },
      {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
          'Content-Type': 'application/json',
        },
      },
    )

    // 登録成功時の処理
    if (response.status === 200) {
      alert('SteamIDが登録されました！')
      router.push('/user') // ユーザービューにリダイレクト
    }
  } catch (error) {
    // エラーハンドリング
    if (error.response && error.response.status === 400) {
      errorMessage.value = '無効なSteamIDです。'
    } else {
      errorMessage.value = '登録中にエラーが発生しました。'
    }
    console.error(error)
  }
}
</script>

<style scoped>
.register-steamid {
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
  margin-bottom: 10px;
}
</style>
