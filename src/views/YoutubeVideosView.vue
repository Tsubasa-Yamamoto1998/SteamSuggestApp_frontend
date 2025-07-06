<template>
  <div class="youtube-videos">
    <h2>関連動画</h2>
    <div class="video-grid">
      <div v-for="video in videos" :key="video.url" class="video-card">
        <a :href="video.url" target="_blank">
          <img :src="video.thumbnail" alt="video thumbnail" class="video-thumbnail" />
          <p class="video-title">{{ video.title }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useYoutubeStore } from '@/stores/youtube'

const route = useRoute()
const youtubeStore = useYoutubeStore()
const videos = ref(youtubeStore.videos) // ストアから動画データを取得

onMounted(() => {
  // クエリパラメータから動画データを取得
  const videoData = route.query.videos
  if (videoData) {
    videos.value = JSON.parse(decodeURIComponent(videoData))
  }
})
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 10px;
}

.youtube-videos {
  margin: 20px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.video-card {
  background-color: #1e1e1e;
  border: solid rgb(0, 225, 255);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.video-title {
  color: #ffffff; /* タイトルを白文字に設定 */
  margin-top: 10px;
  text-decoration: none; /* 下線デコレーションを消す */
}

.video-card a {
  text-decoration: none; /* リンクのデフォルト下線を消す */
  color: inherit; /* 親要素の文字色を継承 */
}

.video-card a:visited {
  color: inherit; /* クリック後も文字色を継承 */
}

.video-thumbnail {
  width: 100%; /* サムネイル画像をvideo-cardの幅に対応させる */
  height: auto; /* アスペクト比を維持 */
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .video-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 480px) {
  .video-grid {
    grid-template-columns: 1fr;
  }

  .video-card {
    padding: 8px;
  }
}
</style>
