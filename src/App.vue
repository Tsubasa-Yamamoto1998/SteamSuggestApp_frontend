<template>
  <div id="app">
    <Header />
    <main>
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

import { onMounted } from 'vue'
import { useAuthCookie } from '@/stores/auth'

const authCookie = useAuthCookie()

onMounted(() => {
  authCookie.checkAuth() // アプリ起動時にログイン状態を確認
})
</script>

<style scoped>
main {
  min-height: 80vh;
  padding: 20px;
}
</style>
