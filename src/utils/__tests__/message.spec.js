import { describe, it, expect, vi } from 'vitest'
import { showMessage, message, type } from '../message'

describe('message.js', () => {
  it('should set the message and type correctly for error', () => {
    showMessage('Error message', 'error')
    expect(message.value).toBe('Error message')
    expect(type.value).toBe('error')
  })

  it('should set the message and type correctly for success', () => {
    showMessage('Success message', 'success')
    expect(message.value).toBe('Success message')
    expect(type.value).toBe('success')
  })

  it('should clear the message after the specified duration', () => {
    vi.useFakeTimers()
    showMessage('Temporary message', 'success', 1000)
    expect(message.value).toBe('Temporary message')
    vi.advanceTimersByTime(1000)
    expect(message.value).toBe('')
    vi.useRealTimers()
  })
})
