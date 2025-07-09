import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComp from '@/components/HeaderComp.vue'
import { useAuthCookie } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/stores/auth', () => ({
  useAuthCookie: vi.fn(),
}))

// モックされたルーターを作成
const router = createRouter({
  history: createWebHistory(),
  routes: [], // 必要に応じてルートを追加
})

describe('HeaderComp.vue', () => {
  it('renders navigation links correctly when not logged in', async () => {
    useAuthCookie.mockReturnValue({ isLoggedIn: false })
    const wrapper = mount(HeaderComp, {
      global: {
        plugins: [router], // モックされたルーターを追加
      },
    })

    await router.isReady() // ルーターが準備完了するのを待つ

    expect(wrapper.text()).toContain('ホーム')
    expect(wrapper.text()).toContain('新規登録')
    expect(wrapper.text()).toContain('ログイン')
    expect(wrapper.text()).not.toContain('ログアウト')
  })

  it('renders navigation links correctly when logged in', async () => {
    useAuthCookie.mockReturnValue({ isLoggedIn: true })
    const wrapper = mount(HeaderComp, {
      global: {
        plugins: [router], // モックされたルーターを追加
      },
    })

    await router.isReady() // ルーターが準備完了するのを待つ

    expect(wrapper.text()).toContain('ホーム')
    expect(wrapper.text()).toContain('ゲーム一覧')
    expect(wrapper.text()).toContain('アカウント編集')
    expect(wrapper.text()).toContain('ログアウト')
  })

  it('calls logout method when logout button is clicked', async () => {
    const mockLogout = vi.fn()
    useAuthCookie.mockReturnValue({ isLoggedIn: true, logout: mockLogout })
    const wrapper = mount(HeaderComp, {
      global: {
        plugins: [router], // モックされたルーターを追加
      },
    })

    await router.isReady() // ルーターが準備完了するのを待つ

    await wrapper.find('.logout-button').trigger('click')
    expect(mockLogout).toHaveBeenCalled()
  })
})
