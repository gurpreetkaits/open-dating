<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        ref="fileInput"
        type="file"
        :accept="acceptedFormats"
        @change="handleFileChange"
        class="hidden"
        :required="required"
      />
      
      <div
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
        :class="{
          'border-red-300 bg-red-50': hasError,
          'border-green-300 bg-green-50': selectedFile && !hasError
        }"
      >
        <VideoCameraIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        
        <div v-if="!selectedFile">
          <p class="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop your video
          </p>
          <p class="text-xs text-gray-500">
            {{ acceptedFormatsText }} (Max 50MB)
          </p>
        </div>
        
        <div v-else class="space-y-2">
          <p class="text-sm font-medium text-gray-900">{{ selectedFile.name }}</p>
          <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
          <button
            @click.stop="removeFile"
            class="text-red-600 hover:text-red-800 text-sm"
          >
            Remove video
          </button>
        </div>
      </div>
    </div>
    
    <p v-if="hint" class="text-xs text-gray-500">{{ hint }}</p>
    <p v-if="errorMessage" class="text-xs text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VideoCameraIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  label: {
    type: String,
    default: 'Upload Video'
  },
  required: {
    type: Boolean,
    default: false
  },
  hint: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'file-selected'])

const fileInput = ref(null)
const selectedFile = ref(null)

const acceptedFormats = 'video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,.mp4,.mov,.avi,.wmv'
const acceptedFormatsText = 'MP4, MOV, AVI, WMV'

const hasError = computed(() => !!props.errorMessage)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

const processFile = (file) => {
  if (validateFile(file)) {
    selectedFile.value = file
    emit('update:modelValue', file)
    emit('file-selected', file)
  }
}

const validateFile = (file) => {
  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']
  const maxSize = 50 * 1024 * 1024 // 50MB
  
  if (!allowedTypes.includes(file.type)) {
    emit('update:modelValue', null)
    return false
  }
  
  if (file.size > maxSize) {
    emit('update:modelValue', null)
    return false
  }
  
  return true
}

const removeFile = () => {
  selectedFile.value = null
  emit('update:modelValue', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script> 