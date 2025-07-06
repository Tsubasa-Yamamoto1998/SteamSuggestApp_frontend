<template>
  <div v-if="authCookie.name" class="welcome-message">
    <p>ようこそ {{ authCookie.name }} さん！</p>
  </div>
  <div class="game-list">
    <h2>あなたのSteamライブラリ</h2>
    <p class="notice">※ゲーム画像が取得できないものはsteamのロゴを使用しています。</p>
    <p class="notice">※ゲーム情報の取得に数秒時間がかかることがあります。</p>
    <p class="sort-order">
      現在のソート順:
      <span class="sort-highlight">{{ sortOrder === 'asc' ? '昇順' : '降順' }}</span>
    </p>
    <!-- ソート順切り替えボタン -->
    <button @click="toggleSortOrder" class="sort-button">
      {{ sortOrder === 'asc' ? '降順に切り替え' : '昇順に切り替え' }}
    </button>
    <ul>
      <li
        v-for="game in sortedGames"
        :key="game.appid"
        class="game-item"
        @click="fetchYoutubeVideos(game.name)"
      >
        <!-- カプセル画像が存在しない場合はimg_icon_urlを利用 -->
        <img
          :src="
            game.imgErrorCapsule
              ? game.imgErrorHeader
                ? steamDefaultImg
                : `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
              : `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`
          "
          @error="handleImageError(game, game.imgErrorCapsule ? 'header' : 'capsule')"
          alt="game image"
          class="game-image"
        />
        <div class="game-info">
          <p class="game-name">{{ game.name }}</p>
          <p class="playtime">プレイ時間: {{ (game.playtime_forever / 60).toFixed(1) }} 時間</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router' // ルーターをインポート
import apiClient from '@/plugins/axios'
import { useAuthCookie } from '@/stores/auth'
import { useYoutubeStore } from '@/stores/youtube'
import steamDefaultImg from '@/assets/steam_default_img.png'
const authCookie = useAuthCookie()
const games = ref([])
const sortOrder = ref('asc') // 昇順・降順の状態を管理
const router = useRouter() // ルーターインスタンスを取得

const fetchSteamLibrary = async () => {
  try {
    // Rails 側でクッキーを利用して認証情報を送信
    const res = await apiClient.get('/custom/steam/library')
    games.value = res.data.response.games.map((game) => ({
      appid: game.appid,
      name: game.name,
      playtime_forever: game.playtime_forever, // プレイ時間を追加
      img_icon_url: game.img_icon_url, // img_icon_urlを追加
      imgError: false, // 画像エラー状態を追加
      imgErrorCapsule: false, // カプセル画像エラー状態を追加
      imgErrorHeader: false, // ヘッダー画像エラー状態を追加
    }))
  } catch (error) {
    console.error('ゲーム一覧の取得に失敗しました:', error)
  }
}

// ソート順を切り替える関数
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// ソートされたゲーム一覧を計算
const sortedGames = computed(() => {
  return [...games.value].sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.playtime_forever - b.playtime_forever
      : b.playtime_forever - a.playtime_forever
  })
})

const handleImageError = (game, type) => {
  if (type === 'capsule') {
    game.imgErrorCapsule = true
  } else if (type === 'header') {
    game.imgErrorHeader = true
  }
}

// YouTube APIから動画を取得する関数
const fetchYoutubeVideos = async (gameTitle) => {
  try {
    const res = await apiClient.post('/custom/youtube/search', { game_title: gameTitle })
    const videos = res.data
    const youtubeStore = useYoutubeStore()
    youtubeStore.setVideos(videos) // ストアに動画データを保存
    router.push('/YoutubeVideos') // クエリパラメータなしで遷移
  } catch (error) {
    console.error('YouTube動画の取得に失敗しました:', error)
  }
}

onMounted(() => {
  fetchSteamLibrary()
})
</script>

<style scoped>
.welcome-message {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin: 20px;
}

.game-list {
  margin: 20px;
}

.game-list h2 {
  font-size: 1.2rem;
  color: #ffffff;
}

.notice {
  font-size: 0.9rem;
  color: #ffcc00; /* 注意を引く黄色 */
  margin-bottom: 5px;
}

.sort-order {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff; /* 白色で目立たせる */
  margin-bottom: 10px;
}

.sort-highlight {
  color: #fffb00; /* 目立つ緑色 */
  font-weight: bold;
  text-decoration: underline; /* 下線を追加 */
}

.sort-button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff; /* 白文字 */
  background: #4caf50; /* 緑地 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease; /* アニメーション */
}

.sort-button:hover {
  background-color: #388e3c; /* ホバー時の濃い緑 */
  transform: scale(1.1); /* ホバー時に拡大 */
}

.game-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.game-image {
  width: 184px;
  height: 69px;
  margin-right: 15px;
}

.game-info {
  display: flex;
  flex-direction: column;
}

/* --- Responsive Design --- */
@media (max-width: 480px) {
  .game-item {
    flex-direction: row; /* 横並びを維持 */
    align-items: center; /* 中央揃え */
  }

  .game-image {
    width: 120px; /* 画像サイズを調整 */
    height: auto;
    margin-right: 10px; /* 画像とテキストの間隔を調整 */
  }

  .game-info {
    font-size: 0.9rem; /* テキストサイズを調整 */
  }

  .game-name {
    font-size: 1rem; /* ゲーム名の文字サイズを調整 */
    font-weight: bold;
  }

  .playtime {
    font-size: 0.8rem; /* プレイ時間の文字サイズを調整 */
    color: #888; /* 少し薄い色で表示 */
  }

  .sort-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
