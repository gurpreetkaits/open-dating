<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
    :class="{
      'flex flex-col': viewMode === 'grid',
      'flex flex-col sm:flex-row': viewMode === 'list'
    }"
  >
    <!-- Media Container -->
    <div 
      class="relative bg-gray-100 dark:bg-gray-700 flex-shrink-0"
      :class="{
        'aspect-[3/4]': viewMode === 'grid',
        'aspect-[4/5] sm:aspect-[3/4] sm:w-80': viewMode === 'list'
      }"
    >
      <!-- Video (Primary) -->
      <video
        v-if="currentMedia.type === 'video'"
        ref="videoRef"
        :src="currentMedia.url"
        class="w-full h-full object-cover cursor-pointer"
        :muted="isMuted"
        :loop="true"
        @click="togglePlay"
        @loadeddata="handleVideoLoaded"
        preload="metadata"
      />
      
      <!-- Photo -->
      <img
        v-else
        :src="currentMedia.url"
        :alt="`${profile.name}'s photo`"
        class="w-full h-full object-cover"
      />
      
      <!-- Media Controls Overlay -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <!-- Play/Pause Button -->
        <button
          v-if="currentMedia.type === 'video'"
          @click="togglePlay"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-all duration-200"
        >
          <PlayIcon v-if="!isPlaying" class="w-6 h-6 ml-1" />
          <PauseIcon v-else class="w-6 h-6" />
        </button>
        
        <!-- Mute Button -->
        <button
          v-if="currentMedia.type === 'video'"
          @click="toggleMute"
          class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-all duration-200"
        >
          <SpeakerWaveIcon v-if="!isMuted" class="w-4 h-4" />
          <SpeakerXMarkIcon v-else class="w-4 h-4" />
        </button>
      </div>
      
      <!-- Online Status -->
      <div v-if="profile.isOnline" class="absolute top-4 left-4">
        <div class="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
      </div>
      
      <!-- Media Counter -->
      <div class="absolute bottom-4 right-4">
        <div class="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
          {{ currentMediaIndex + 1 }} / {{ allMedia.length }}
        </div>
      </div>
      
      <!-- Media Thumbnails -->
      <div 
        class="absolute flex gap-2"
        :class="{
          'bottom-4 left-4': viewMode === 'grid',
          'bottom-4 left-4 sm:top-4 sm:left-4 sm:flex-col': viewMode === 'list'
        }"
      >
        <button
          v-for="(media, index) in allMedia.slice(0, 4)"
          :key="index"
          @click="setCurrentMedia(index)"
          class="rounded-lg overflow-hidden border-2 transition-all duration-200"
          :class="[
            currentMediaIndex === index 
              ? 'border-white shadow-lg' 
              : 'border-white/50 hover:border-white/80',
            viewMode === 'grid' ? 'w-10 h-10' : 'w-8 h-8 sm:w-10 sm:h-10'
          ]"
        >
          <video
            v-if="media.type === 'video'"
            :src="media.url"
            class="w-full h-full object-cover"
            muted
          />
          <img
            v-else
            :src="media.url"
            :alt="`Preview ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
    
    <!-- Profile Info -->
    <div 
      class="p-4 lg:p-6 flex-1"
      :class="{
        '': viewMode === 'grid',
        'flex flex-col justify-between': viewMode === 'list'
      }"
    >
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h3 
            class="font-bold text-gray-900 dark:text-white mb-1"
            :class="{
              'text-xl': viewMode === 'grid',
              'text-lg': viewMode === 'list'
            }"
          >
            {{ profile.name }}, {{ calculateAge(profile.birthDate) }}
          </h3>
          <div class="flex items-center text-gray-500 dark:text-gray-400">
            <MapPinIcon class="w-4 h-4 mr-1" />
            <span class="text-sm">{{ profile.distance }}km away</span>
          </div>
        </div>
        <button
          @click="$emit('bookmark', profile.id)"
          class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <BookmarkIcon class="w-5 h-5" />
        </button>
      </div>
      
      <p 
        v-if="profile.bio" 
        class="text-gray-600 dark:text-gray-300 text-sm mb-4"
        :class="{
          'line-clamp-2': viewMode === 'grid',
          'line-clamp-3': viewMode === 'list'
        }"
      >
        {{ profile.bio }}
      </p>
      
      <!-- Interests -->
      <div v-if="profile.interests?.length" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="interest in profile.interests.slice(0, 3)"
            :key="interest"
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
          >
            {{ interest }}
          </span>
          <span
            v-if="profile.interests.length > 3"
            class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
          >
            +{{ profile.interests.length - 3 }}
          </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div 
        class="flex gap-3 mt-4"
        :class="{
          '': viewMode === 'grid',
          'mt-auto': viewMode === 'list'
        }"
      >
        <button
          @click="$emit('pass', profile.id)"
          class="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center"
          :class="{
            'py-3 px-4': viewMode === 'grid',
            'py-2 px-3 text-sm': viewMode === 'list'
          }"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        <button
          @click="$emit('like', profile.id)"
          class="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
          :class="{
            'py-3 px-4': viewMode === 'grid',
            'py-2 px-3 text-sm': viewMode === 'list'
          }"
        >
          <HeartIcon class="w-5 h-5" />
        </button>
        <button
          @click="$emit('superLike', profile.id)"
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
          :class="{
            'py-3 px-4': viewMode === 'grid',
            'py-2 px-3 text-sm': viewMode === 'list'
          }"
        >
          <StarIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  HeartIcon,
  XMarkIcon,
  MapPinIcon,
  BookmarkIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  StarIcon,
} from '@heroicons/vue/24/outline'
import { calculateAge } from '../../../utils/helpers.js'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  viewMode: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'list'].includes(value)
  },
})

const emit = defineEmits(['like', 'pass', 'superLike', 'bookmark'])

const videoRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)
const currentMediaIndex = ref(0)

const allMedia = computed(() => {
  const media = []
  
  // Video first (required)
  if (props.profile.video) {
    media.push({
      type: 'video',
      url: props.profile.video,
    })
  }
  
  // Then photos (up to 4)
  if (props.profile.photos?.length) {
    props.profile.photos.forEach(photo => {
      media.push({
        type: 'photo',
        url: photo,
      })
    })
  }
  
  return media
})

const currentMedia = computed(() => {
  return allMedia.value[currentMediaIndex.value] || { type: 'photo', url: '/default-avatar.jpg' }
})

const setCurrentMedia = (index) => {
  if (videoRef.value && isPlaying.value) {
    videoRef.value.pause()
    isPlaying.value = false
  }
  currentMediaIndex.value = index
}

const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}

const handleVideoLoaded = () => {
  if (videoRef.value) {
    // Auto-play video when loaded (muted)
    videoRef.value.play().catch(() => {
      // Auto-play failed, user interaction required
    })
    isPlaying.value = true
  }
}

// Cleanup video when component unmounts
onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}

.aspect-\[4\/5\] {
  aspect-ratio: 4/5;
}
</style> 