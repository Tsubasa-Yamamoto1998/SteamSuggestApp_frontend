<template>
  <div id="app" class="app-container">
    <Header />
    <main>
      <MessageDisplay />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// リセットCSSのインポート
import 'normalize.css'

import Header from '@/components/HeaderComp.vue'
import Footer from '@/components/FooterComp.vue'
import MessageDisplay from '@/components/MessageDisplay.vue'

import { onMounted } from 'vue'
import { useAuthCookie } from '@/stores/auth'

const authCookie = useAuthCookie()

onMounted(() => {
  authCookie.checkAuth() // アプリ起動時にログイン状態を確認
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1b2838; /* ネイビー背景色 */
  color: #c7d5e0; /* 明るいブルーグレー */
}

main {
  flex: 1;
  padding: 20px;
  padding-top: 100px; /* ヘッダーの高さ分だけ余白を追加 */
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  main {
    padding: 15px;
    padding-top: 72px; /* ヘッダーの高さ分だけ余白を追加 */
  }
}

@media (max-width: 480px) {
  main {
    padding: 10px;
    padding-top: 132px; /* ヘッダーの高さ分だけ余白を追加 */
  }
}
</style>
