<template>
  <header class="header">
    <h1 class="title">Steam Game Suggest</h1>
    <nav class="nav">
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/signup">新規登録</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">ログイン</RouterLink>
      <button v-if="isLoggedIn" @click="logout" class="logout-button">ログアウト</button>
      <RouterLink v-if="isLoggedIn" to="/games">ゲーム一覧</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/account">アカウント編集</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authCookie = useAuthCookie()
const isLoggedIn = computed(() => authCookie.isLoggedIn)
const router = useRouter()

const logout = () => {
  authCookie.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  background-color: #1b2838; /* ネイビー背景色 */
  color: #c7d5e0; /* 明るいブルーグレー */
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.8rem;
  color: #ffffff; /* 白色 */
  margin-bottom: 8px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav a {
  color: #66c0f4; /* 明るい青色 */
  text-decoration: none;
  font-weight: bold;
}

.nav a.router-link-active {
  text-decoration: underline;
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
  .nav {
    flex-direction: column;
    gap: 5px;
  }

  .title {
    font-size: 1.2rem;
  }
}
</style>
