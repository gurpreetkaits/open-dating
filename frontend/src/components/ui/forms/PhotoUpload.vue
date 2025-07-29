<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(photo, index) in photoSlots"
        :key="index"
        class="relative aspect-square"
      >
        <input
          :ref="`fileInput${index}`"
          type="file"
          :accept="acceptedFormats"
          @change="(event) => handleFileChange(event, index)"
          class="hidden"
          :required="required && index < requiredCount"
        />
        
        <div
          v-if="!photo"
          @click="() => triggerFileInput(index)"
          @dragover.prevent
          @drop.prevent="(event) => handleDrop(event, index)"
          class="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          :class="{
            'border-red-300 bg-red-50': hasError(index)
          }"
        >
          <PhotoIcon class="w-8 h-8 text-gray-400 mb-2" />
          <p class="text-xs text-gray-600 text-center px-2">
            Photo {{ index + 1 }}
            <span v-if="index < requiredCount" class="text-red-500">*</span>
          </p>
        </div>
        
        <div v-else class="relative w-full h-full group">
          <img
            :src="getImagePreview(photo)"
            :alt="`Photo ${index + 1}`"
            class="w-full h-full object-cover rounded-lg"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <button
              @click="() => removePhoto(index)"
              class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="text-xs text-gray-500">
      <p>{{ acceptedFormatsText }} (Max 5MB each)</p>
      <p>Required: {{ requiredCount }} photos minimum</p>
    </div>
    
    <p v-if="generalError" class="text-xs text-red-600">{{ generalError }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { PhotoIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  label: {
    type: String,
    default: 'Upload Photos'
  },
  required: {
    type: Boolean,
    default: false
  },
  requiredCount: {
    type: Number,
    default: 4
  },
  maxCount: {
    type: Number,
    default: 4
  },
  errorMessages: {
    type: Array,
    default: () => []
  },
  generalError: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'photos-changed'])

const photoSlots = ref(Array(props.maxCount).fill(null))
const fileInputRefs = ref({})

const acceptedFormats = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,.jpeg,.jpg,.png,.gif,.webp'
const acceptedFormatsText = 'JPEG, PNG, GIF, WebP'

const hasError = (index) => {
  return props.errorMessages && props.errorMessages[index]
}

const validPhotos = computed(() => {
  return photoSlots.value.filter(photo => photo !== null)
})

watch(validPhotos, (newPhotos) => {
  emit('update:modelValue', newPhotos)
  emit('photos-changed', newPhotos)
}, { deep: true })

const triggerFileInput = (index) => {
  const input = document.querySelector(`input[ref="fileInput${index}"]`)
  if (input) {
    input.click()
  }
}

const handleFileChange = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file, index)
  }
}

const handleDrop = (event, index) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0], index)
  }
}

const processFile = (file, index) => {
  if (validateFile(file)) {
    photoSlots.value[index] = file
  }
}

const validateFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return false
  }
  
  if (file.size > maxSize) {
    return false
  }
  
  return true
}

const removePhoto = (index) => {
  photoSlots.value[index] = null
  const input = document.querySelector(`input[ref="fileInput${index}"]`)
  if (input) {
    input.value = ''
  }
}

const getImagePreview = (file) => {
  if (file instanceof File) {
    return URL.createObjectURL(file)
  }
  return file
}
</script> 