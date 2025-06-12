<template>
  <div id="app">
    <main>
      <section class="welcome-section">
        <h1 class="title">ようこそ！Steam Suggest Appへ</h1>
        <p class="description">
          Steam Suggest
          App（以下、sg_app）は、Steamユーザー向けにゲームライブラリの管理や、ゲームに関連する情報を提供するアプリケーションです。
        </p>
        <div class="features">
          <div class="feature-card">
            <h2>🔑 Steam IDの登録</h2>
            <p>
              ユーザーは自身のSteam IDを登録することで、Steamライブラリ情報をアプリに連携できます。
            </p>
          </div>
          <div class="feature-card">
            <h2>📚 Steamライブラリの取得</h2>
            <p>
              登録されたSteam IDを使用して、Steam
              APIを通じてユーザーのゲームライブラリを取得します。
            </p>
          </div>
          <div class="feature-card">
            <h2>🎥 YouTube検索</h2>
            <p>ゲームタイトルを基に、YouTubeから関連するゲームプレイ動画を検索できます。</p>
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
            <li>Steamライブラリ情報を取得します。</li>
            <li>ゲームタイトルを入力してYouTube動画を検索します。</li>
          </ol>
        </div>
        <p class="cta">さあ、sg_appを使ってゲーム体験をさらに充実させましょう！</p>
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
  background-color: #f9f9f9;
}

.welcome-section {
  text-align: center;
  max-width: 800px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature-card {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.feature-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 1rem;
  color: #666;
}

.usage {
  margin-top: 40px;
  text-align: left;
}

.usage h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.usage ol {
  font-size: 1rem;
  color: #555;
  padding-left: 20px;
  list-style: decimal;
}

.cta {
  margin-top: 30px;
  font-size: 1.2rem;
  color: #007bff;
  font-weight: bold;
}
</style>
