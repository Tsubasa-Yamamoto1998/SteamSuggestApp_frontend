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
import 'normalize.css'

import Header from './components/HeaderComp.vue'
import Footer from './components/FooterComp.vue'
</script>

<style scoped>
main {
  min-height: 80vh;
  padding: 20px;
}
</style>
