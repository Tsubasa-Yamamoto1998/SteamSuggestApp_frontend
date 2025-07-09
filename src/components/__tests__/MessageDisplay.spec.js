import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageDisplay from '@/components/MessageDisplay.vue'
import { message, type } from '@/utils/message'

describe('MessageDisplay.vue', () => {
  it('displays the message and applies the correct class for success', async () => {
    message.value = 'Success message'
    type.value = 'success'

    const wrapper = mount(MessageDisplay)
    expect(wrapper.text()).toBe('Success message')
    expect(wrapper.classes()).toContain('success')
  })

  it('displays the message and applies the correct class for error', async () => {
    message.value = 'Error message'
    type.value = 'error'

    const wrapper = mount(MessageDisplay)
    expect(wrapper.text()).toBe('Error message')
    expect(wrapper.classes()).toContain('error')
  })

  it('does not render anything when message is empty', async () => {
    message.value = ''
    const wrapper = mount(MessageDisplay)
    expect(wrapper.find('div').exists()).toBe(false) // 修正: div 要素が存在しないことを確認
  })
})
