<template>
  <header class="header">
    <h1>Steam Game Suggest</h1>
    <nav class="nav">
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/signup">新規登録</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">ログイン</RouterLink>
      <button v-if="isLoggedIn" @click="logout" class="logout-button">ログアウト</button>
      <RouterLink v-if="isLoggedIn" to="/games">ゲーム一覧</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/account">アカウント編集</RouterLink>
      <RouterLink to="/about">アバウト</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authCookie = useAuthCookie()
const isLoggedIn = computed(() => authCookie.isLoggedIn) // リアクティブに変更
const router = useRouter()

const logout = () => {
  authCookie.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  background-color: #2d2d2d;
  color: white;
  padding: 16px;
  text-align: center;
}
.nav {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav a.router-link-active {
  text-decoration: underline;
}
.logout-button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
