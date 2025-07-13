import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import GamesView from '@/views/GamesView.vue'
import { createTestingPinia } from '@pinia/testing'
import apiClient from '@/plugins/axios'

vi.mock('@/plugins/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush, // `push` メソッドをモック化
  }),
}))

describe('GamesView.vue', () => {
  let router

  beforeEach(() => {
    router = {
      default: {
        push: vi.fn(),
      },
    }
  })

  it('Steamライブラリを取得してゲーム一覧を表示する', async () => {
    const mockGames = [
      {
        appid: 123,
        name: 'Test Game',
        playtime_forever: 120,
        img_icon_url: '',
      },
    ]
    apiClient.get.mockResolvedValueOnce({
      data: {
        response: {
          games: mockGames,
        },
      },
    })

    const wrapper = mount(GamesView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // `createSpy` オプションを設定
          }),
        ],
      },
    })

    await wrapper.vm.fetchSteamLibrary()
    expect(wrapper.vm.games).toMatchObject(mockGames)
    expect(wrapper.find('.game-name').text()).toBe('Test Game')
    expect(wrapper.find('.playtime').text()).toBe('プレイ時間: 2.0 時間')
  })

  it('ソート順を切り替えるボタンが動作する', async () => {
    const wrapper = mount(GamesView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // `createSpy` オプションを設定
          }),
        ],
      },
    })

    wrapper.vm.games = [
      { appid: 1, name: 'Game A', playtime_forever: 100 },
      { appid: 2, name: 'Game B', playtime_forever: 200 },
    ]

    wrapper.vm.toggleSortOrder()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.sortOrder).toBe('desc')
    expect(wrapper.vm.sortedGames[0].name).toBe('Game B')
  })

  it('YouTube動画取得後に遷移する', async () => {
    apiClient.post.mockResolvedValueOnce({
      data: [{ videoId: 'test_video_id', title: 'Test Video' }],
    })

    const wrapper = mount(GamesView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // `createSpy` オプションを設定
          }),
        ],
        mocks: {
          $router: router, // モック化した `router` を提供
        },
      },
    })

    await wrapper.vm.fetchYoutubeVideos('Test Game')
    await wrapper.vm.$nextTick()
    expect(mockPush).toHaveBeenCalledWith('/YoutubeVideos')
  })
})
