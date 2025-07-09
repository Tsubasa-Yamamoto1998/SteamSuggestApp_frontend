import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterComp from '@/components/FooterComp.vue'

describe('FooterComp.vue', () => {
  it('renders footer text correctly', () => {
    const wrapper = mount(FooterComp)
    expect(wrapper.text()).toContain('© 2025 My Steam App')
  })
})
