<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Discover People
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Swipe to find your perfect match
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Swipe Section -->
          <div class="lg:col-span-3">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <!-- Swipe Cards Container -->
              <div class="flex justify-center">
                <div class="relative w-full max-w-sm">
                  <!-- Sample Profile Card -->
                  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <!-- Profile Image -->
                    <div class="h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <UserIcon class="w-24 h-24 text-gray-400 dark:text-gray-500" />
                    </div>
                    
                    <!-- Profile Info -->
                    <div class="p-6">
                      <div class="flex items-center justify-between mb-2">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Sarah, 25</h3>
                        <div class="flex items-center text-gray-500 dark:text-gray-400">
                          <MapPinIcon class="w-4 h-4 mr-1" />
                          <span class="text-sm">2 km away</span>
                        </div>
                      </div>
                      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Love hiking, photography, and good coffee ☕
                      </p>
                      
                      <!-- Tags -->
                      <div class="flex flex-wrap gap-2 mb-6">
                        <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          Photography
                        </span>
                        <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          Hiking
                        </span>
                        <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          Coffee
                        </span>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex justify-center space-x-4">
                        <button class="w-14 h-14 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                          <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button class="w-14 h-14 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                          <HeartIcon class="w-6 h-6 text-white dark:text-gray-900" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Quick Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Likes</span>
                  <span class="font-semibold text-gray-900 dark:text-white">12</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Matches</span>
                  <span class="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Views</span>
                  <span class="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
              </div>
            </div>

            <!-- Recent Matches -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Matches</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Emma</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Lisa</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                  </div>
                </div>
              </div>
              <router-link 
                to="/matches" 
                class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mt-3"
              >
                View all matches
                <ChevronRightIcon class="w-4 h-4 ml-1" />
              </router-link>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <router-link 
                  to="/chat" 
                  class="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChatBubbleLeftRightIcon class="w-5 h-5 mr-3" />
                  <span class="text-sm">Messages</span>
                </router-link>
                <router-link 
                  to="/profile" 
                  class="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <UserIcon class="w-5 h-5 mr-3" />
                  <span class="text-sm">Edit Profile</span>
                </router-link>
                <router-link 
                  to="/settings" 
                  class="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <CogIcon class="w-5 h-5 mr-3" />
                  <span class="text-sm">Settings</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import {
  HeartIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  MapPinIcon,
  ChevronRightIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'
import AppLayout from '../layouts/AppLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script> 