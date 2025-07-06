<template>
  <div v-if="message" class="message-display" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
import { message, type } from '@/utils/message'
</script>

<style scoped>
.message-display {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
  color: white;
  text-align: center;
}

.message-display.success {
  background-color: #28a745;
}

.message-display.error {
  background-color: #dc3545;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .message-display {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .message-display {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
