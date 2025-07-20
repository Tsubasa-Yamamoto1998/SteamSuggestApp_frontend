import { ref } from 'vue'

const message = ref('')
const type = ref('success') // 'success' or 'error'

export const showMessage = (msg, msgType = 'success', duration = 2000) => {
  message.value = msg
  type.value = msgType
  setTimeout(() => {
    message.value = ''
  }, duration)
}

export { message, type }
