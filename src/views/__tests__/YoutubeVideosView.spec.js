vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: {
      videos: encodeURIComponent(
        JSON.stringify([
          {
            url: 'https://www.youtube.com/watch?v=example1',
            thumbnail: 'https://example.com/thumbnail1.jpg',
            title: 'Example Video 1',
          },
          {
            url: 'https://www.youtube.com/watch?v=example2',
            thumbnail: 'https://example.com/thumbnail2.jpg',
            title: 'Example Video 2',
          },
        ]),
      ),
    },
  })),
}))

vi.mock('@/stores/youtube', () => ({
  useYoutubeStore: vi.fn(() => ({
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=storeVideo1',
        thumbnail: 'https://example.com/storeThumbnail1.jpg',
        title: 'Store Video 1',
      },
    ],
  })),
}))

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YoutubeVideosView from '@/views/YoutubeVideosView.vue'
import { useRoute } from 'vue-router'
import { flushPromises } from '@vue/test-utils'

describe('YoutubeVideosView.vue', () => {
  it('クエリパラメータから動画データを取得して表示する', async () => {
    const wrapper = mount(YoutubeVideosView)
    await flushPromises()

    // クエリパラメータから取得した動画データが表示されているか確認
    const videoCards = wrapper.findAll('.video-card')
    expect(videoCards).toHaveLength(2)

    expect(videoCards[0].find('a').attributes('href')).toBe(
      'https://www.youtube.com/watch?v=example1',
    )
    expect(videoCards[0].find('img').attributes('src')).toBe('https://example.com/thumbnail1.jpg')
    expect(videoCards[0].find('.video-title').text()).toBe('Example Video 1')

    expect(videoCards[1].find('a').attributes('href')).toBe(
      'https://www.youtube.com/watch?v=example2',
    )
    expect(videoCards[1].find('img').attributes('src')).toBe('https://example.com/thumbnail2.jpg')
    expect(videoCards[1].find('.video-title').text()).toBe('Example Video 2')
  })

  it('ストアから動画データを取得して表示する', async () => {
    vi.mocked(useRoute).mockReturnValueOnce({ query: {} }) // クエリパラメータなし

    const wrapper = mount(YoutubeVideosView)

    // ストアから取得した動画データが表示されているか確認
    const videoCards = wrapper.findAll('.video-card')
    expect(videoCards).toHaveLength(1)

    expect(videoCards[0].find('a').attributes('href')).toBe(
      'https://www.youtube.com/watch?v=storeVideo1',
    )
    expect(videoCards[0].find('img').attributes('src')).toBe(
      'https://example.com/storeThumbnail1.jpg',
    )
    expect(videoCards[0].find('.video-title').text()).toBe('Store Video 1')
  })
})
