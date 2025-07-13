import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AccountView from '@/views/AccountView.vue'
import apiClient from '@/plugins/axios'

vi.mock('@/plugins/axios', () => ({
  default: {
    put: vi.fn(), // `put` メソッドをモック化
  },
}))

describe('AccountView.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AccountView)
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  // レンダリング
  it('renders the account edit form correctly', () => {
    expect(wrapper.find('h1').text()).toBe('アカウント編集')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input#username').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('input#confirmPassword').exists()).toBe(true)
    expect(wrapper.find('input#steamID').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('更新')
  })

  // データの初期値
  it('binds input fields correctly', async () => {
    const usernameInput = wrapper.find('input#username')
    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const confirmPasswordInput = wrapper.find('input#confirmPassword')
    const steamIDInput = wrapper.find('input#steamID')

    await usernameInput.setValue('testuser')
    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await confirmPasswordInput.setValue('password123')
    await steamIDInput.setValue('123456789')

    expect(wrapper.vm.username).toBe('testuser')
    expect(wrapper.vm.email).toBe('test@example.com')
    expect(wrapper.vm.password).toBe('password123')
    expect(wrapper.vm.confirmPassword).toBe('password123')
    expect(wrapper.vm.steamID).toBe('123456789')
  })

  it('shows validation errors when input is invalid', async () => {
    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const confirmPasswordInput = wrapper.find('input#confirmPassword')
    const form = wrapper.find('form')

    await emailInput.setValue('invalid-email')
    await passwordInput.setValue('Aa1@')
    await confirmPasswordInput.setValue('different')

    await form.trigger('submit') // フォーム送信
    await wrapper.vm.submitForm()

    const errorTexts = wrapper.findAll('.error').map((e) => e.text())

    expect(wrapper.find('.error').exists()).toBe(true)
    expect(errorTexts).toContain('正しいメールアドレスを入力してください。')
    expect(errorTexts).toContain('パスワードは6文字以上にしてください。')
    expect(errorTexts).toContain('パスワードが一致しません。')
  })

  it('shows an error message when API call fails', async () => {
    // APIのモック設定：エラーを返す
    apiClient.put.mockRejectedValueOnce({
      response: {
        data: {
          errors: {
            full_messages: ['更新に失敗しました。'],
          },
        },
      },
    })

    const emailInput = wrapper.find('input#email')
    const passwordInput = wrapper.find('input#password')
    const confirmPasswordInput = wrapper.find('input#confirmPassword')
    const form = wrapper.find('form')

    // フォームに値を入力
    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123A@')
    await confirmPasswordInput.setValue('password123A@')

    // フォーム送信
    await form.trigger('submit.prevent')
    await wrapper.vm.submitForm()

    // エラーメッセージの確認
    const errorMessage = wrapper.find('.error').text()

    expect(wrapper.find('.error').exists()).toBe(true)
    expect(errorMessage).toBe('更新に失敗しました。')
  })
})
