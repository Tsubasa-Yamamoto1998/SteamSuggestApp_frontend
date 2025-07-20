import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: '',
      profile_image_url: '',
    },
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await apiClient.get('/custom/users/me')
        this.user = res.data.user
      } catch (err) {
        console.error('ユーザー取得失敗:', err)
      }
    },
    setUser(newUser) {
      this.user = newUser
    },
  },
})
