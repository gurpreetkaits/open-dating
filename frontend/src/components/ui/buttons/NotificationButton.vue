<template>
  <button
    @click="toggleNotifications"
    class="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
  >
    <BellIcon class="w-6 h-6" />
    
    <!-- Notification Badge -->
    <span
      v-if="unreadCount > 0"
      class="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
    >
      {{ unreadCount > 9 ? '9+' : unreadCount }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { BellIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  unreadCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['toggle'])

const toggleNotifications = () => {
  $emit('toggle')
}
</script> 