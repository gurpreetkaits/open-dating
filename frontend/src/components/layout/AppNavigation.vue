<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-3 group">
          <div class="relative">
            <div class="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
              <HeartIcon class="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <div class="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Open Dating
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">Find your match</p>
          </div>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            to="/dashboard"
            class="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2"
            active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 shadow-sm"
          >
            <SparklesIcon class="w-4 h-4" />
            <span>Discover</span>
          </router-link>
          
          <router-link
            to="/matches"
            class="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2"
            active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 shadow-sm"
          >
            <UserGroupIcon class="w-4 h-4" />
            <span>Matches</span>
            <!-- Sample badge for matches -->
            <span class="ml-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              3
            </span>
          </router-link>
          
          <router-link
            to="/chat"
            class="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-2"
            active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 shadow-sm"
          >
            <ChatBubbleLeftRightIcon class="w-4 h-4" />
            <span>Messages</span>
            <!-- Unread message indicator -->
            <span v-if="chatStore.getUnreadCount > 0" class="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
              {{ chatStore.getUnreadCount > 99 ? '99+' : chatStore.getUnreadCount }}
            </span>
          </router-link>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-3">
          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-5 h-5" />
            <XMarkIcon v-else class="w-5 h-5" />
          </button>
          
          <NotificationButton />
          <UserDropdown />
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div 
      v-show="mobileMenuOpen"
      class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <router-link
          to="/dashboard"
          @click="mobileMenuOpen = false"
          class="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
        >
          <SparklesIcon class="w-5 h-5" />
          <span>Discover</span>
        </router-link>
        
        <router-link
          to="/matches"
          @click="mobileMenuOpen = false"
          class="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
        >
          <div class="flex items-center space-x-3">
            <UserGroupIcon class="w-5 h-5" />
            <span>Matches</span>
          </div>
          <span class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            3
          </span>
        </router-link>
        
        <router-link
          to="/chat"
          @click="mobileMenuOpen = false"
          class="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
        >
          <div class="flex items-center space-x-3">
            <ChatBubbleLeftRightIcon class="w-5 h-5" />
            <span>Messages</span>
          </div>
          <span v-if="chatStore.getUnreadCount > 0" class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
            {{ chatStore.getUnreadCount > 99 ? '99+' : chatStore.getUnreadCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { 
  HeartIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useChatStore } from '../../stores/chat.js'
import NotificationButton from '../ui/buttons/NotificationButton.vue'
import UserDropdown from '../ui/navigation/UserDropdown.vue'

const chatStore = useChatStore()
const mobileMenuOpen = ref(false)
</script> 