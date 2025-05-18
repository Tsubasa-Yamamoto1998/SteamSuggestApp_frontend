<template>
  <div id="app">
    <Header />
    <main>
      <h1>ホーム画面だよ</h1>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
main {
  min-height: 80vh;
  padding: 20px;
}
</style>
