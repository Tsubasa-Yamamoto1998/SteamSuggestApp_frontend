vi.mock('@/plugins/axios', () => {
  return {
    __esModule: true,
    default: {
      post: vi.fn(),
    },
  }
})

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/utils/message', () => ({
  showMessage: vi.fn(),
}))

import { mount } from '@vue/test-utils'
import { describe, it, vi } from 'vitest'
import SignupView from '@/views/SignupView.vue'
import apiClient from '@/plugins/axios'
import { flushPromises } from '@vue/test-utils'
// import { set } from 'cypress/types/lodash'
import { useRouter } from 'vue-router'
import { showMessage } from '@/utils/message'
// import { beforeEach } from 'vitest'
import { expect } from 'vitest'

describe('SignupView.vue', () => {
  it('フォームを正しく送信すると成功メッセージが表示され、ホーム画面に遷移する', async () => {
    const mockPost = apiClient.post

    // モックのレスポンス設定が本番想定と違うんじゃない？byたま
    mockPost.mockResolvedValue({
      status: 'success',
      data: {
        id: 34,
        username: 'テストくん',
        email: 'preciada.t@icloud.com',
        created_at: '2025-07-13T05:03:25.417Z',
        updated_at: '2025-07-13T05:03:25.417Z',
        provider: 'email',
        uid: 'preciada.t@icloud.com',
        allow_password_change: false,
        image: null,
        steam_id: null,
      },
    })
    console.log('apiClient in test1:', mockPost.mock)

    // const mockRouter = useRouter() // useRouterを呼び出してモック化されたオブジェクトを取得
    // const mockPush = mockRouter.push

    const wrapper = mount(SignupView, {
      global: {
        config: {
          globalProperties: {
            CONFIRM_URL: 'http://localhost:5173/confirm',
          },
        },
      },
    })

    // フォームフィールドに値を入力
    await wrapper.find('input#username').setValue('testuser')
    await wrapper.find('input#email').setValue('test@example.com')
    await wrapper.find('input#password').setValue('Test@1234')
    await wrapper.find('input#confirmPassword').setValue('Test@1234')

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    await flushPromises()
    console.log('apiClient in test2:', mockPost)
    console.log('apiClient in test2:', mockPost.mock)

    // API呼び出しの確認
    expect(mockPost).toHaveBeenCalledWith('/auth', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test@1234',
      password_confirmation: 'Test@1234',
      confirm_success_url: import.meta.env.VITE_APP_CONFIRM_SUCCESS_URL,
    })

    // 成功メッセージの確認
    expect(showMessage).toHaveBeenCalledWith(
      'メールアドレスに認証メールを送信しました！',
      'success',
    )

    // ホーム画面への遷移確認
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  // it('APIエラーが発生するとエラーメッセージが表示される', async () => {
  //   apiClient.post.mockRejectedValueOnce({
  //     response: {
  //       data: {
  //         errors: {
  //           full_messages: ['メールアドレスは既に使用されています。'],
  //         },
  //       },
  //     },
  //   })

  //   const wrapper = mount(SignupView)

  //   // フォームフィールドに値を入力
  //   await wrapper.find('input#username').setValue('testuser')
  //   await wrapper.find('input#email').setValue('test@example.com')
  //   await wrapper.find('input#password').setValue('Test@1234')
  //   await wrapper.find('input#confirmPassword').setValue('Test@1234')

  //   // フォームを送信
  //   await wrapper.find('form').trigger('submit.prevent')

  //   // エラーメッセージの確認
  //   expect(wrapper.find('.error').text()).toBe('メールアドレスは既に使用されています。')

  //   // showMessageの確認
  //   expect(showMessage).toHaveBeenCalledWith('登録に失敗しました。', 'error')
  // })

  // it('バリデーションエラーが発生するとエラーメッセージが表示される', async () => {
  //   const wrapper = mount(SignupView)

  //   // フォームフィールドに不正な値を入力
  //   await wrapper.find('input#username').setValue('')
  //   await wrapper.find('input#email').setValue('invalid-email')
  //   await wrapper.find('input#password').setValue('short')
  //   await wrapper.find('input#confirmPassword').setValue('different')

  //   // フォームを送信
  //   await wrapper.find('form').trigger('submit.prevent')

  //   // バリデーションエラーメッセージの確認
  //   expect(wrapper.find('.validation-error').text()).toBe('ユーザー名を入力してください。')
  //   expect(wrapper.find('input#email + .validation-error').text()).toBe(
  //     '正しいメールアドレスを入力してください。',
  //   )
  //   expect(wrapper.find('input#password + .validation-error').text()).toBe(
  //     'パスワードは6文字以上にしてください。英大文字、小文字、数字、特殊文字を含めてください。',
  //   )
  //   expect(wrapper.find('input#confirmPassword + .validation-error').text()).toBe(
  //     'パスワードが一致しません。',
  //   )
  // })
})
