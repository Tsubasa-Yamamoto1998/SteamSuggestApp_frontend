import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeView)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the main title correctly', () => {
    const title = wrapper.find('.title')
    expect(title.text()).toBe('ようこそ！Steam Suggest Appへ')
  })

  it('renders the description correctly', () => {
    const description = wrapper.find('.description')
    expect(description.text()).toContain('Steamユーザー向けにゲームライブラリの管理や')
  })

  it('renders all feature cards', () => {
    const featureCards = wrapper.findAll('.feature-card')
    expect(featureCards.length).toBe(4)

    const expectedTitles = [
      '🔑 Steamとの連携',
      '📚 ゲームのソート表示',
      '🎥 YouTube検索',
      '🔒 ユーザー認証',
    ]

    featureCards.forEach((card, index) => {
      const title = card.find('h2').text()
      expect(title).toBe(expectedTitles[index])
    })
  })

  it('renders the usage section correctly', () => {
    const usageTitle = wrapper.find('.usage h2')
    expect(usageTitle.text()).toBe('使い方')

    const usageSteps = wrapper.findAll('.usage ol li')
    expect(usageSteps.length).toBe(3)

    const expectedSteps = [
      'アカウントを作成し、ログインしてください。',
      'ログイン後、Steam IDを登録します。',
      '”ゲーム一覧”ページでゲームライブラリ情報を確認します。',
    ]

    usageSteps.forEach((step, index) => {
      expect(step.text()).toBe(expectedSteps[index])
    })
  })

  it('renders the call-to-action text correctly', () => {
    const cta = wrapper.find('.cta')
    expect(cta.text()).toBe('さあ、自分の積みゲーを確認してプレイしましょう！')
  })
})
