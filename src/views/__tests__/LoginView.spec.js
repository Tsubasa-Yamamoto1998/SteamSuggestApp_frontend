const routerMock = {
  push: vi.fn(),
}

const authCookieMock = {
  checkAuth: vi.fn(),
  isSteamID: false, // ← ここを書き換えるだけでテスト内とVue内が連動する
}
// モックの設定
const RouterLinkStub = vi.hoisted(() => {
  const { defineComponent, h } = require('vue') // VueのdefineComponentとhをインポート、importはモックの外で行うとエラーになるため、requireで行う
  return defineComponent({
    name: 'RouterLink',
    props: ['to'],
    setup(_, { slots }) {
      return () => h('a', {}, slots.default?.())
    },
  })
})

vi.mock('vue-router', () => ({
  useRouter: () => routerMock,
  RouterLink: RouterLinkStub,
}))

vi.mock('@/stores/auth', () => ({
  useAuthCookie: () => authCookieMock, // ← ここがポイント
}))

vi.mock('@/plugins/axios', () => {
  return {
    default: {
      post: vi.fn(), // デフォルトエクスポートの post メソッドをモック
    },
  }
})

vi.mock('@/utils/message', () => ({
  showMessage: vi.fn(),
}))

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import { useAuthCookie } from '@/stores/auth'
import apiClient from '@/plugins/axios'
import { showMessage } from '@/utils/message'
import { RouterLink } from 'vue-router'

describe('LoginView.vue', () => {
  let wrapper
  let authCookie

  beforeEach(() => {
    authCookie = useAuthCookie()
    wrapper = mount(LoginView, {
      global: {
        components: {
          'router-link': RouterLink,
        },
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  // DOMのレンダリングテスト
  it('renders the login form correctly', () => {
    expect(wrapper.find('h2').text()).toBe('ログイン')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('ログイン')
  })

  // フォームのv-modelバインディングテスト
  it('binds email and password inputs correctly', async () => {
    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')

    expect(wrapper.vm.email).toBe('test@example.com')
    expect(wrapper.vm.password).toBe('password123')
  })

  // フォームの送信テスト
  it('shows an error message when login fails with 401', async () => {
    apiClient.post.mockRejectedValueOnce({
      response: { status: 401 },
    })

    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const form = wrapper.find('form')

    await emailInput.setValue('wrong@example.com')
    await passwordInput.setValue('wrongpassword')
    await form.trigger('submit.prevent')

    expect(apiClient.post).toHaveBeenCalledWith('/auth/sign_in', {
      email: 'wrong@example.com',
      password: 'wrongpassword',
    })
    expect(wrapper.find('.error-message').text()).toBe(
      'メールアドレスまたはパスワードが間違っています。',
    )
    expect(showMessage).toHaveBeenCalledWith('ログインに失敗しました。', 'error')
  })

  it('redirects to the correct route on successful login', async () => {
    apiClient.post.mockResolvedValueOnce({
      status: 200,
    })

    authCookie.isSteamID = true

    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const form = wrapper.find('form')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await form.trigger('submit.prevent')

    expect(apiClient.post).toHaveBeenCalledWith('/auth/sign_in', {
      email: 'test@example.com',
      password: 'password123',
    })
    expect(authCookie.checkAuth).toHaveBeenCalled()
    expect(routerMock.push).toHaveBeenCalledWith('/')
  })

  it('redirects to /RegisterSteamid if steam_id is not registered', async () => {
    apiClient.post.mockResolvedValueOnce({
      status: 200,
    })

    authCookie.isSteamID = false

    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const form = wrapper.find('form')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await form.trigger('submit.prevent')

    expect(routerMock.push).toHaveBeenCalledWith('/RegisterSteamid')
  })
})
