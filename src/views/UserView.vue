<template>
  <div v-if="authCookie.name" class="welcome-message">
    <p>ようこそ {{ authCookie.name }} さん！</p>
  </div>
  <div class="game-list">
    <h2>あなたのSteamライブラリ:</h2>
    <p>現在のソート順: {{ sortOrder === 'asc' ? '昇順' : '降順' }}</p>
    <!-- ソート順切り替えボタン -->
    <button @click="toggleSortOrder" class="sort-button">
      {{ sortOrder === 'asc' ? '降順に切り替え' : '昇順に切り替え' }}
    </button>
    <ul>
      <li v-for="game in sortedGames" :key="game.appid" class="game-item">
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
import axios from 'axios'
import { useAuthCookie } from '@/stores/auth'
import steamDefaultImg from '@/assets/steam_default_img.png'

const authCookie = useAuthCookie()
const games = ref([])
const sortOrder = ref('asc') // 昇順・降順の状態を管理

const fetchSteamLibrary = async () => {
  try {
    const res = await axios.get('http://localhost:3000/custom/steam/library', {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
        'Content-Type': 'application/json',
      },
    })
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

onMounted(() => {
  fetchSteamLibrary()
})
</script>

<style scoped>
.welcome-message {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 20px;
}

.game-list {
  margin: 20px;
}

.game-list h2 {
  font-size: 1.2rem;
  color: #34495e;
}

.sort-button {
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
}

.game-list ul {
  list-style-type: none;
  padding: 0;
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

.game-name {
  font-size: 1rem;
  font-weight: bold;
  color: #2c3e50;
}

.playtime {
  font-size: 0.9rem;
  color: #7f8c8d;
}
</style>
