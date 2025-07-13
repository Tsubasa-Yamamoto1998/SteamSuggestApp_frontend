import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import ConfirmView from '@/views/ConfirmView.vue'
import { nextTick } from 'vue'

describe('ConfirmView.vue', () => {
  let router

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
        { path: '/login', name: 'Login', component: { template: '<div>Login</div>' } },
      ],
    })
  })

  it('認証成功時に成功メッセージが表示される', async () => {
    router.push({ path: '/', query: { account_confirmation_success: 'true' } })
    await router.isReady()

    const wrapper = mount(ConfirmView, {
      global: {
        plugins: [router],
        stubs: {
          Header: true, // Headerコンポーネントをモック
          Footer: true, // Footerコンポーネントをモック
        },
      },
    })

    await nextTick()

    expect(wrapper.find('h1').text()).toBe(
      '認証が完了しました！下ボタンを押してログインしてください。',
    )
  })

  it('認証失敗時に失敗メッセージが表示される', async () => {
    router.push({ path: '/', query: { account_confirmation_success: 'false' } })
    await router.isReady()

    const wrapper = mount(ConfirmView, {
      global: {
        plugins: [router],
        stubs: {
          Header: true, // Headerコンポーネントをモック
          Footer: true, // Footerコンポーネントをモック
        },
      },
    })

    expect(wrapper.find('h1').text()).toBe('認証に失敗しました。再度お試しください。')
  })

  it('ログイン画面への遷移ボタンが存在する', async () => {
    router.push({ path: '/', query: { account_confirmation_success: 'true' } })
    await router.isReady()

    const wrapper = mount(ConfirmView, {
      global: {
        plugins: [router],
        stubs: {
          Header: true, // Headerコンポーネントをモック
          Footer: true, // Footerコンポーネントをモック
        },
      },
    })
    await nextTick()

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('ログイン画面へ')
  })
})
