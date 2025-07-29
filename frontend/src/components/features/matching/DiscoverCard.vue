<template>
  <div
    ref="cardElement"
    class="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300 select-none"
    :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
    :style="cardStyle"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <!-- Image Stack -->
    <div class="relative h-96">
      <img
        v-for="(photo, index) in profile.photos"
        :key="index"
        :src="photo"
        :alt="`${profile.name}'s photo ${index + 1}`"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-100': index === currentPhotoIndex, 'opacity-0': index !== currentPhotoIndex }"
      />
      
      <!-- Photo Navigation Dots -->
      <div v-if="profile.photos.length > 1" class="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div
          v-for="(photo, index) in profile.photos"
          :key="index"
          class="w-2 h-2 rounded-full transition-colors duration-200"
          :class="index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'"
        />
      </div>
      
      <!-- Photo Navigation Areas -->
      <div class="absolute inset-0 flex">
        <div
          class="flex-1 z-10"
          @click="previousPhoto"
        />
        <div
          class="flex-1 z-10"
          @click="nextPhoto"
        />
      </div>
      
      <!-- Action Indicators -->
      <div
        v-if="swipeDirection === 'left'"
        class="absolute inset-0 bg-red-500/20 flex items-center justify-center"
      >
        <div class="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
          NOPE
        </div>
      </div>
      
      <div
        v-if="swipeDirection === 'right'"
        class="absolute inset-0 bg-green-500/20 flex items-center justify-center"
      >
        <div class="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg">
          LIKE
        </div>
      </div>
    </div>
    
    <!-- Profile Info -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ profile.name }}, {{ calculateAge(profile.birthDate) }}
        </h2>
        <div class="flex items-center text-gray-500">
          <MapPinIcon class="w-5 h-5 mr-1" />
          <span>{{ profile.distance }}km</span>
        </div>
      </div>
      
      <p v-if="profile.bio" class="text-gray-600 mb-4">
        {{ truncateText(profile.bio, 120) }}
      </p>
      
      <!-- Interests -->
      <div v-if="profile.interests?.length" class="flex flex-wrap gap-2">
        <span
          v-for="interest in profile.interests.slice(0, 4)"
          :key="interest"
          class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
        >
          {{ interest }}
        </span>
      </div>
    </div>
    
    <!-- Action Buttons (Mobile) -->
    <div class="flex justify-center space-x-4 pb-6 md:hidden">
      <button
        @click="handlePass"
        class="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
      >
        <XMarkIcon class="w-6 h-6 text-gray-600" />
      </button>
      
      <button
        @click="handleLike"
        class="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-200"
      >
        <HeartIcon class="w-6 h-6 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  HeartIcon,
  XMarkIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'
import { calculateAge, truncateText } from '../../../utils/helpers.js'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

defineEmits(['like', 'pass', 'remove'])

const cardElement = ref(null)
const currentPhotoIndex = ref(0)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const swipeDirection = ref(null)

const cardStyle = computed(() => ({
  transform: `translate(${dragOffset.value.x}px, ${dragOffset.value.y}px) rotate(${dragOffset.value.x * 0.1}deg)`,
}))

const nextPhoto = () => {
  if (currentPhotoIndex.value < props.profile.photos.length - 1) {
    currentPhotoIndex.value++
  }
}

const previousPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

const handleLike = () => {
  $emit('like', props.profile.id)
  $emit('remove')
}

const handlePass = () => {
  $emit('pass', props.profile.id)
  $emit('remove')
}

const startDrag = (event) => {
  isDragging.value = true
  const clientX = event.clientX || event.touches[0].clientX
  const clientY = event.clientY || event.touches[0].clientY
  
  const startX = clientX - dragOffset.value.x
  const startY = clientY - dragOffset.value.y
  
  const handleMove = (moveEvent) => {
    const currentX = (moveEvent.clientX || moveEvent.touches[0].clientX) - startX
    const currentY = (moveEvent.clientY || moveEvent.touches[0].clientY) - startY
    
    dragOffset.value = { x: currentX, y: currentY }
    
    // Update swipe direction indicator
    if (Math.abs(currentX) > 50) {
      swipeDirection.value = currentX > 0 ? 'right' : 'left'
    } else {
      swipeDirection.value = null
    }
  }
  
  const handleEnd = () => {
    isDragging.value = false
    
    // Determine if swipe was significant enough
    if (Math.abs(dragOffset.value.x) > 100) {
      if (dragOffset.value.x > 0) {
        handleLike()
      } else {
        handlePass()
      }
    } else {
      // Reset card position
      dragOffset.value = { x: 0, y: 0 }
      swipeDirection.value = null
    }
    
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseup', handleEnd)
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('touchend', handleEnd)
  }
  
  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', handleEnd)
  document.addEventListener('touchmove', handleMove)
  document.addEventListener('touchend', handleEnd)
  
  event.preventDefault()
}
</script> 