<template>
  <div class="bg-white border-t border-gray-200 flex-shrink-0 safe-area-inset-bottom">
    <div class="grid grid-cols-4 py-2">
      <router-link
        to="/discover"
        class="flex flex-col items-center py-3 text-xs transition-colors duration-200"
        active-class="text-gray-900"
        inactive-class="text-gray-500"
      >
        <HeartIcon class="w-6 h-6 mb-1" />
        <span class="font-medium">Discover</span>
      </router-link>
      
      <router-link
        to="/matches"
        class="flex flex-col items-center py-3 text-xs transition-colors duration-200"
        active-class="text-gray-900"
        inactive-class="text-gray-500"
      >
        <UsersIcon class="w-6 h-6 mb-1" />
        <span class="font-medium">Matches</span>
      </router-link>
      
      <router-link
        to="/chat"
        class="flex flex-col items-center py-3 text-xs transition-colors duration-200"
        active-class="text-gray-900"
        inactive-class="text-gray-500"
      >
        <ChatBubbleLeftRightIcon class="w-6 h-6 mb-1" />
        <span class="font-medium">Messages</span>
      </router-link>
      
      <router-link
        to="/profile"
        class="flex flex-col items-center py-3 text-xs transition-colors duration-200"
        active-class="text-gray-900"
        inactive-class="text-gray-500"
      >
        <UserIcon class="w-6 h-6 mb-1" />
        <span class="font-medium">Profile</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {
  HeartIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
</script>

<style scoped>
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style> 