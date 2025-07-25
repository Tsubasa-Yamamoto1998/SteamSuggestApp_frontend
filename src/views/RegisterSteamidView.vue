<template>
  <div class="register-steamid">
    <h2 class="title">SteamIDを登録</h2>
    <p class="description">SteamIDを入力して登録してください。</p>
    <form @submit.prevent="registerSteamID">
      <div class="form-group">
        <label for="steamID">SteamID</label>
        <input type="text" id="steamID" v-model="steamID" placeholder="SteamIDを入力" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">登録</button>
    </form>

    <div class="how-to-check">
      <h3>SteamIDの確認方法</h3>
      <p>以下の手順でSteamIDを確認できます。</p>
      <div class="howto-images">
        <img src="@/assets/steamID_howto1.png" alt="SteamID確認方法1" />
        <p>手順1: 右上のユーザーアイコンよりSteamのアカウント詳細ページを開きます。</p>
        <img src="@/assets/steamID_howto2.png" alt="SteamID確認方法2" />
        <p>手順2: ”〇〇のアカウント”下部に表示される数字がSteamIDです。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/plugins/axios'
import { showMessage } from '@/utils/message'

const steamID = ref('')
const errorMessage = ref('')
const router = useRouter()

const registerSteamID = async () => {
  try {
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

    if (response.status === 200) {
      showMessage('SteamIDが登録されました！', 'success')
      router.push('/')
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errorMessage.value = '無効なSteamIDです。'
      showMessage('無効なSteamIDです。', 'error')
    } else {
      errorMessage.value = '登録中にエラーが発生しました。'
      showMessage('登録中にエラーが発生しました。', 'error')
    }
    console.error(error)
  }
}
</script>

<style scoped>
.register-steamid {
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background: #2a475e; /* ダークネイビー */
  border-radius: 10px;
  color: #c7d5e0; /* 明るいブルーグレー */
  text-align: center;
}

.title {
  font-size: 2rem;
  color: #ffffff; /* 白色 */
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50; /* 緑色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c; /* 濃い緑色 */
}

.error-message {
  color: #ff4d4f; /* 赤色 */
  font-size: 14px;
  margin-bottom: 10px;
}

.how-to-check {
  margin-top: 40px;
  text-align: left;
}

.howto-images img {
  max-width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .register-steamid {
    padding: 20px;
  }

  .title {
    font-size: 1.8rem;
  }

  button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .register-steamid {
    padding: 15px;
  }

  .title {
    font-size: 1.5rem;
  }

  input {
    font-size: 12px;
    padding: 8px;
  }

  button {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
