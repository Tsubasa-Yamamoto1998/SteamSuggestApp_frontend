<template>
  <div id="app">
    <Header />
    <main>
      <h1>認証が完了しました！下ボタンを押してログインしてください。</h1>
      <router-view />
      <!-- ログイン画面への遷移ボタン -->
      <router-link to="/login">
        <button>ログイン画面へ</button>
      </router-link>
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

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
