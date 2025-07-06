<template>
  <div id="app">
    <main>
      <section class="welcome-section">
        <h1 class="title">ようこそ！Steam Suggest Appへ</h1>
        <p class="description">
          Steam Suggest Appは、Steamユーザー向けにゲームライブラリの管理や、<br />
          ゲームに関連する情報を提供するアプリケーションです。
        </p>
        <div class="features">
          <div class="feature-card">
            <h2>🔑 Steamとの連携</h2>
            <p>自身のSteam IDを登録することで、Steamライブラリ情報をアプリに連携できます。</p>
          </div>
          <div class="feature-card">
            <h2>📚 ゲームのソート表示</h2>
            <p>”ゲーム一覧”ページでゲームをプレイ時間の昇順・降順で表示します。</p>
          </div>
          <div class="feature-card">
            <h2>🎥 YouTube検索</h2>
            <p>
              ”ゲーム一覧”ページでタイトルをクリックすると、YouTubeから関連するゲームプレイ動画を検索し表示します。
            </p>
          </div>
          <div class="feature-card">
            <h2>🔒 ユーザー認証</h2>
            <p>Devise Token AuthとDoorkeeperを使用したセキュアな認証機能を提供します。</p>
          </div>
        </div>
        <div class="usage">
          <h2>使い方</h2>
          <ol>
            <li>アカウントを作成し、ログインしてください。</li>
            <li>ログイン後、Steam IDを登録します。</li>
            <li>”ゲーム一覧”ページでゲームライブラリ情報を確認します。</li>
          </ol>
        </div>
        <p class="cta">さあ、自分の積みゲーを確認してプレイしましょう！</p>
      </section>
    </main>
  </div>
</template>

<script setup>
// 特にロジックは不要なため、空のままにしています
</script>

<style scoped>
main {
  min-height: 80vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b2838; /* ネイビー背景色 */
}

.welcome-section {
  text-align: center;
  max-width: 800px;
  background: #2a475e; /* ダークネイビー */
  padding: 30px;
  border-radius: 10px;
  color: #c7d5e0; /* テキストカラーを明るいブルーグレーに */
}

.title {
  font-size: 2.5rem;
  color: #ffffff; /* 白色 */
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  color: #c7d5e0; /* 明るいブルーグレー */
  margin-bottom: 30px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature-card {
  background: #1b2838; /* ネイビー */
  padding: 20px;
  border-radius: 8px;
  width: 40%;
  text-align: left;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .welcome-section {
    padding: 20px;
  }

  .feature-card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 15px;
  }

  .feature-card {
    padding: 15px;
  }
}

.usage {
  margin-top: 40px;
  text-align: left;
}

.usage h2 {
  font-size: 1.8rem;
  color: #ffffff; /* 白色 */
  margin-bottom: 20px;
}

.usage ol {
  font-size: 1rem;
  color: #c7d5e0; /* 明るいブルーグレー */
  padding-left: 20px;
  list-style: decimal;
}

.cta {
  margin-top: 30px;
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: bold;
}
</style>
