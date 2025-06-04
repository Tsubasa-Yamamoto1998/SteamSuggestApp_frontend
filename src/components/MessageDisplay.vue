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
  left: 20%;
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
</style>
