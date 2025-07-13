import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RegisterSteamidView from '@/views/RegisterSteamidView.vue'
import apiClient from '@/plugins/axios'

const mockPush = vi.fn()

vi.mock('@/plugins/axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

vi.mock('@/utils/message', () => ({
  showMessage: vi.fn(),
}))

describe('RegisterSteamidView.vue', () => {
  it('SteamIDを正しく登録すると成功メッセージが表示され、ホーム画面に遷移する', async () => {
    apiClient.post.mockResolvedValueOnce({ status: 200 })

    const wrapper = mount(RegisterSteamidView)

    // SteamIDを入力
    const input = wrapper.find('input#steamID')
    await input.setValue('123456789')

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')

    // API呼び出しの確認
    expect(apiClient.post).toHaveBeenCalledWith(
      '/custom/steam/register',
      { steamID: '123456789' },
      expect.any(Object),
    )

    // 成功メッセージの確認
    expect(wrapper.vm.errorMessage).toBe('')
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('無効なSteamIDを登録するとエラーメッセージが表示される', async () => {
    apiClient.post.mockRejectedValueOnce({
      response: { status: 400 },
    })

    const wrapper = mount(RegisterSteamidView)

    // SteamIDを入力
    const input = wrapper.find('input#steamID')
    await input.setValue('invalidSteamID')

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')

    // エラーメッセージの確認
    expect(wrapper.vm.errorMessage).toBe('無効なSteamIDです。')
  })

  it('APIエラーが発生すると一般的なエラーメッセージが表示される', async () => {
    apiClient.post.mockRejectedValueOnce(new Error('Network Error'))

    const wrapper = mount(RegisterSteamidView)

    // SteamIDを入力
    const input = wrapper.find('input#steamID')
    await input.setValue('123456789')

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')

    // エラーメッセージの確認
    expect(wrapper.vm.errorMessage).toBe('登録中にエラーが発生しました。')
  })
})
