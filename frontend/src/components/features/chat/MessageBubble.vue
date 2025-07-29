<template>
  <div :class="[
    'flex w-full',
    isOwn ? 'justify-end' : 'justify-start'
  ]">
    <div :class="[
      'max-w-xs lg:max-w-md xl:max-w-lg flex flex-col',
      isOwn ? 'items-end' : 'items-start'
    ]">
      <!-- Message Bubble -->
      <div :class="[
        'relative px-4 py-2 rounded-2xl break-words',
        isOwn 
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-br-md' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
      ]">
        <!-- Message Content -->
        <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
        
        <!-- Message tail/pointer -->
        <div v-if="isOwn" class="absolute -bottom-0 -right-0 w-3 h-3 bg-gray-900 dark:bg-white transform rotate-45"></div>
        <div v-else class="absolute -bottom-0 -left-0 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
      </div>
      
      <!-- Message Info -->
      <div :class="[
        'flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 space-x-2',
        isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      ]">
        <!-- Timestamp -->
        <span>{{ formatTime(message.createdAt) }}</span>
        
        <!-- Message Status (only for own messages) -->
        <div v-if="isOwn" class="flex items-center">
          <!-- Sending -->
          <div v-if="message.status === 'sending'" class="w-3 h-3">
            <div class="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent"></div>
          </div>
          
          <!-- Sent -->
          <CheckIcon v-else-if="message.status === 'sent'" class="w-3 h-3" />
          
          <!-- Delivered -->
          <div v-else-if="message.status === 'delivered'" class="flex">
            <CheckIcon class="w-3 h-3" />
            <CheckIcon class="w-3 h-3 -ml-1" />
          </div>
          
          <!-- Read -->
          <div v-else-if="message.status === 'read'" class="flex text-blue-500 dark:text-blue-400">
            <CheckIcon class="w-3 h-3" />
            <CheckIcon class="w-3 h-3 -ml-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isOwn: {
    type: Boolean,
    default: false
  }
})

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    // Show time for messages from today
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  } else if (diffInHours < 48) {
    // Show "Yesterday" for messages from yesterday
    return 'Yesterday'
  } else {
    // Show date for older messages
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }
}
</script> 