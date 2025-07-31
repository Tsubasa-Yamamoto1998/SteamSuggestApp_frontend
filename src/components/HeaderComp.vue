<template>
  <header class="header">
    <h1 class="title">Steam Game Suggest</h1>
    <!-- ハンバーガーメニューのトグルボタン -->
    <button
      class="hamburger"
      @click="toggleMenu"
      :class="{ 'is-open': isMenuOpen }"
      aria-label="メニューを開閉"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <!-- ナビゲーションメニュー -->
    <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
      <RouterLink to="/" @click="closeMenu">ホーム</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/signup" @click="closeMenu">新規登録</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login" @click="closeMenu">ログイン</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/games" @click="closeMenu">ゲーム一覧</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/account" @click="closeMenu">アカウント</RouterLink>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
    console.log('User info fetched:', response.data.user)
    user.value = response.data.user
    console.log('Current user:', user.value)
  } catch (err) {
    error.value = 'ユーザー情報の取得に失敗しました。'
    console.error(err)
  }
}

onMounted(() => {
  console.log('Mounted HeaderComp')
  console.log('Is user logged in?', isLoggedIn.value)
  if (isLoggedIn.value) {
    fetchUserInfo()
    console.log('Fetching user info on mount')
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

watch(isLoggedIn, (newValue) => {
  if (newValue) {
    fetchUserInfo()
    console.log('Fetching user info after isLoggedIn changed')
  }
})

// ハンバーガーメニューの状態を管理
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
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
  position: fixed; /* ヘッダーを固定 */
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
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
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  position: relative;
  background-color: transparent;
  flex-direction: row; /* 横並び */
  align-items: center;
  justify-content: center;
  transform: none;
  opacity: 1;
  pointer-events: auto;
}

.nav.nav-open {
  transform: none;
  opacity: 1;
  pointer-events: auto;
}

.nav a {
  color: #66c0f4; /* 明るい青色 */
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  margin: 0 10px;
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
  justify-content: flex-end; /* 右端に配置 */
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

/* ハンバーガーメニューのスタイル */
.hamburger {
  display: none; /* デフォルトで非表示 */
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 20;
  top: 16px;
  right: 16px;
}

.hamburger-line {
  width: 100%;
  height: 4px;
  background-color: #c7d5e0;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.hamburger.is-open .hamburger-line:nth-child(1) {
  transform: translateY(15px) rotate(45deg);
}

.hamburger.is-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open .hamburger-line:nth-child(3) {
  transform: translateY(-15px) rotate(-45deg);
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .hamburger {
    display: flex; /* 480px以下で表示 */
  }

  .nav {
    display: none; /* 480px以下で非表示 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    background-color: #1b2838;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    gap: 10px; /* 各リンク間の余白を調整 */
  }

  .nav.nav-open {
    display: flex;
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav a {
    font-size: 1.2rem; /* リンクのフォントサイズを調整 */
    margin: 5px 0; /* 各リンクの上下余白を調整 */
    padding: 10px 20px; /* リンクの内側余白を調整 */
    width: 80%; /* リンクを横幅いっぱいに近づける */
    text-align: center; /* テキストを中央揃え */
    border-radius: 5px; /* リンクに角丸を追加 */
    background-color: #2a475e; /* 背景色を追加 */
    color: #66c0f4; /* テキスト色 */
    text-decoration: none;
  }

  .nav a:hover {
    background-color: #66c0f4; /* ホバー時の背景色 */
    color: #1b2838; /* ホバー時のテキスト色 */
  }
}
</style>
