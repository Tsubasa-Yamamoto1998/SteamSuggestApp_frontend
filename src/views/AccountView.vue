<template>
  <div class="account-view">
    <h1>アカウント情報</h1>
    <div class="user-info">
      <img
        :src="user.profile_image_url || '/default-profile.png'"
        alt="プロフィール画像"
        class="profile-image"
      />
      <p><strong>ユーザー名:</strong> {{ user.username || '未設定' }}</p>
      <p><strong>メールアドレス:</strong> {{ user.email || '未設定' }}</p>
      <p><strong>SteamID:</strong> {{ user.steam_id || '未設定' }}</p>
    </div>
    <button @click="goToEditPage">編集</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/plugins/axios'
import { useRouter } from 'vue-router'

const user = ref({
  username: '',
  email: '',
  steam_id: '',
  profile_image_url: '', // プロフィール画像URLを追加
})
const error = ref('')

const router = useRouter()

// ユーザー情報を取得
const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get('/custom/users/me')
    user.value = response.data.user
  } catch (err) {
    error.value = 'ユーザー情報の取得に失敗しました。'
    console.error(err)
  }
}

const goToEditPage = () => {
  // 編集ページに遷移
  router.push('/edit')
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.account-view {
  max-width: 400px;
  margin: 0 auto;
  color: white;
}

.user-info {
  margin-bottom: 20px;
  text-align: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
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
</style>
