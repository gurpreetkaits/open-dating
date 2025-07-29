<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <!-- Profile Image -->
    <div class="relative aspect-w-3 aspect-h-4">
      <img
        :src="profile.photos[0] || '/default-avatar.jpg'"
        :alt="`${profile.name}'s photo`"
        class="w-full h-80 object-cover"
      />
      
      <!-- Online Status -->
      <div v-if="profile.isOnline" class="absolute top-4 right-4">
        <div class="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      
      <!-- Photo Count -->
      <div v-if="profile.photos.length > 1" class="absolute top-4 left-4">
        <div class="bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 text-white text-sm">
          <CameraIcon class="w-4 h-4 inline mr-1" />
          {{ profile.photos.length }}
        </div>
      </div>
    </div>
    
    <!-- Profile Info -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-gray-900">
          {{ profile.name }}, {{ calculateAge(profile.birthDate) }}
        </h3>
        <div class="flex items-center text-gray-500">
          <MapPinIcon class="w-4 h-4 mr-1" />
          <span class="text-sm">{{ profile.distance }}km</span>
        </div>
      </div>
      
      <p v-if="profile.bio" class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ profile.bio }}
      </p>
      
      <!-- Interests -->
      <div v-if="profile.interests && profile.interests.length" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="interest in profile.interests.slice(0, 3)"
            :key="interest"
            class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
          >
            {{ interest }}
          </span>
          <span
            v-if="profile.interests.length > 3"
            class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            +{{ profile.interests.length - 3 }} more
          </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-6">
        <button
          @click="$emit('pass', profile.id)"
          class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors duration-200"
        >
          <XMarkIcon class="w-5 h-5 mx-auto" />
        </button>
        <button
          @click="$emit('like', profile.id)"
          class="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200"
        >
          <HeartIcon class="w-5 h-5 mx-auto" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  HeartIcon,
  XMarkIcon,
  MapPinIcon,
  CameraIcon,
} from '@heroicons/vue/24/outline'
import { calculateAge } from '../../utils/helpers.js'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

defineEmits(['like', 'pass'])
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-3 {
  position: relative;
  padding-bottom: calc(4 / 3 * 100%);
}

.aspect-h-4 img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style> 