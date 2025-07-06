<template>
  <div id="app">
    <Header />
    <main>
      <h1 v-if="isSuccess">認証が完了しました！下ボタンを押してログインしてください。</h1>
      <h1 v-else>認証に失敗しました。再度お試しください。</h1>
      <!-- ログイン画面への遷移ボタン -->
      <router-link to="/login">
        <button>ログイン画面へ</button>
      </router-link>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSuccess = ref(false)

onMounted(() => {
  // クエリパラメータから認証結果を取得
  const successParam = route.query.account_confirmation_success
  isSuccess.value = successParam !== 'false' // 成功かどうかを判定
})
</script>

<style scoped>
main {
  min-height: 80vh;
  padding: 20px;
  text-align: center;
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

/* --- Responsive Design --- */
@media (max-width: 960px) {
  main {
    padding: 15px;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  main {
    padding: 10px;
  }

  button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
