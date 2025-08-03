<template>
  <div>
    <cropper
      class="cropper"
      :src="src"
      :stencil-props="{ aspectRatio: null }"
      :auto-zoom="true"
      :resize-image="true"
      ref="cropperRef"
    />
    <button @click="emitCroppedImage">切り抜き画像を保存</button>
  </div>
</template>

<script setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { ref } from 'vue'

defineProps({
  src: String,
})

const emit = defineEmits(['cropped'])

const cropperRef = ref(null)

const emitCroppedImage = () => {
  const result = cropperRef.value?.getResult()
  if (result?.canvas) {
    result.canvas.toBlob((blob) => {
      emit('cropped', blob)
    }, 'image/jpeg')
  }
}
</script>

<style scoped>
.cropper {
  width: 100%;
  max-width: 320px;
  height: auto;
  margin: auto;
}

button {
  padding: 10px 16px;
  font-weight: bold;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* ボタンを全幅に設定 */
}
</style>
