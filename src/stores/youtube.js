// filepath: c:\steam_suggest_app\sg_app_frontend\src\stores\youtube.js
import { defineStore } from 'pinia'

export const useYoutubeStore = defineStore('youtube', {
  state: () => ({
    videos: [],
  }),
  actions: {
    setVideos(videoData) {
      this.videos = videoData
    },
  },
})
