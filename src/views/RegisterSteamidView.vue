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

    <!-- SteamID確認方法のセクション -->
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
import apiClient from '@/plugins/axios' // apiClientをインポート
import { showMessage } from '@/utils/message' // showMessageをインポート

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
      showMessage('SteamIDが登録されました！', 'success') // 成功メッセージを表示
      router.push('/')
    }
  } catch (error) {
    // エラーハンドリング
    if (error.response && error.response.status === 400) {
      errorMessage.value = '無効なSteamIDです。'
      showMessage('無効なSteamIDです。', 'error') // エラーメッセージを表示
    } else {
      errorMessage.value = '登録中にエラーが発生しました。'
      showMessage('登録中にエラーが発生しました。', 'error') // エラーメッセージを表示
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

/* SteamID確認方法セクションのスタイル */
.how-to-check {
  margin-top: 30px;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.howto-images {
  margin-top: 15px;
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
    max-width: 90%;
    padding: 15px;
  }

  button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .register-steamid {
    padding: 10px;
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
