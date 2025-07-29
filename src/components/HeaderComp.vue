<template>
  <header class="header">
    <h1 class="title">Steam Game Suggest</h1>
    <nav class="nav">
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/signup">新規登録</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">ログイン</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/games">ゲーム一覧</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/account">アカウント</RouterLink>
      <button v-if="isLoggedIn" @click="logout" class="logout-button">ログアウト</button>
    </nav>
    <div class="user-info-placeholder" v-if="!isLoggedIn"></div>
    <div class="user-info" v-if="isLoggedIn">
      <img
        :src="user.profile_image_url || defaultProfileImage"
        alt="プロフィール画像"
        class="profile-image"
      />
      <span class="username">{{ user.username || 'ゲスト' }}</span>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import apiClient from '@/plugins/axios'

// デフォルト画像をインポート
import defaultProfileImage from '@/assets/default_profile_image.png'

const user = ref({
  username: '',
  profile_image_url: '',
})
const error = ref('')
const authCookie = useAuthCookie()
const isLoggedIn = computed(() => authCookie.isLoggedIn)

const router = useRouter()

const logout = () => {
  authCookie.logout()
  router.push('/login')
}

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

onMounted(() => {
  if (isLoggedIn.value) {
    fetchUserInfo()
  }

  // ユーザー情報更新イベントをリッスン
  window.addEventListener('user-updated', (event) => {
    user.value = event.detail // 更新されたユーザー情報を反映
  })
})

onUnmounted(() => {
  // イベントリスナーをクリーンアップ
  window.removeEventListener('user-updated', (event) => {
    user.value = event.detail
  })
})
</script>

<style scoped>
.header {
  background-color: #1b2838; /* ネイビー背景色 */
  color: #c7d5e0; /* 明るいブルーグレー */
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.8rem;
  color: #ffffff; /* 白色 */
  margin: 0;
  flex: 1; /* 左側に配置 */
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex: 2; /* 中央に配置 */
}

.nav a {
  color: #66c0f4; /* 明るい青色 */
  text-decoration: none;
  font-weight: bold;
}

.nav a.router-link-active {
  text-decoration: underline;
}

.user-info-placeholder {
  flex: 1; /* user-info のスペースを埋める */
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1; /* 右側に配置 */
  justify-content: flex-end;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: #c7d5e0; /* 明るいブルーグレー */
  font-weight: bold;
}

.logout-button {
  background: none;
  border: none;
  color: #66c0f4; /* 明るい青色 */
  font-weight: bold;
  cursor: pointer;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .nav {
    flex-wrap: wrap;
    gap: 10px;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav {
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }

  .user-info,
  .user-info-placeholder {
    justify-content: center;
    margin-top: 10px;
  }

  .title {
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
  }
}
</style>
