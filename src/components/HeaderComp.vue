<template>
  <header class="header">
    <h1>Steam Game Suggest</h1>
    <nav class="nav">
      <RouterLink to="/">ホーム</RouterLink>
      <RouterLink to="/signup">新規登録</RouterLink>
      <RouterLink to="/login">ログイン</RouterLink>
      <RouterLink to="/about">アバウト</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
</style>
