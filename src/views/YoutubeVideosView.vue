<template>
  <div class="youtube-videos">
    <h2>関連動画</h2>
    <ul>
      <li v-for="video in videos" :key="video.url" class="video-item">
        <a :href="video.url" target="_blank">
          <img :src="video.thumbnail" alt="video thumbnail" class="video-thumbnail" />
          <p class="video-title">{{ video.title }}</p>
        </a>
      </li>
    </ul>
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
.youtube-videos {
  margin: 20px;
}

.video-item {
  margin: 10px 0;
}

.video-thumbnail {
  width: 120px;
  height: 90px;
  margin-right: 10px;
}

.video-title {
  font-size: 1rem;
  color: #2c3e50;
}
</style>
