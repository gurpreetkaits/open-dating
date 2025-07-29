<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Your Matches
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            People who liked you back
          </p>
        </div>

        <!-- Matches Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="match in matches" 
            :key="match.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            @click="startChat(match)"
          >
            <!-- Profile Image -->
            <div class="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative">
              <UserIcon class="w-16 h-16 text-gray-400 dark:text-gray-500" />
              
              <!-- Online indicator -->
              <div 
                v-if="match.isOnline" 
                class="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
              ></div>
              
              <!-- Match indicator -->
              <div class="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <HeartIcon class="w-4 h-4 text-red-500" />
              </div>
            </div>
            
            <!-- Profile Info -->
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ match.name }}, {{ match.age }}
                </h3>
                <div class="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPinIcon class="w-4 h-4 mr-1" />
                  <span class="text-sm">{{ match.distance }}</span>
                </div>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {{ match.bio }}
              </p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-4">
                <span 
                  v-for="interest in match.interests.slice(0, 3)" 
                  :key="interest"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {{ interest }}
                </span>
              </div>
              
              <!-- Match Date -->
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Matched {{ formatMatchDate(match.matchedAt) }}</span>
                <ChevronRightIcon class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="matches.length === 0" class="text-center py-12">
          <HeartIcon class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No matches yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            Keep swiping to find your perfect match!
          </p>
          <router-link 
            to="/dashboard" 
            class="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <SparklesIcon class="w-4 h-4 mr-2" />
            Start Discovering
          </router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import {
  UserIcon,
  HeartIcon,
  MapPinIcon,
  ChevronRightIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()

// Sample matches data
const matches = ref([
  {
    id: 1,
    name: 'Emma Johnson',
    age: 25,
    distance: '2 km away',
    bio: 'Love hiking, photography, and good coffee. Looking for someone to explore the city with!',
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel'],
    isOnline: true,
    matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: 'Sarah Miller',
    age: 28,
    distance: '5 km away',
    bio: 'Yoga instructor and food lover. Always up for trying new restaurants!',
    interests: ['Yoga', 'Cooking', 'Food', 'Wellness'],
    isOnline: false,
    matchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: 'Lisa Brown',
    age: 24,
    distance: '3 km away',
    bio: 'Artist and nature enthusiast. Let\'s create beautiful memories together!',
    interests: ['Art', 'Nature', 'Painting', 'Museums'],
    isOnline: true,
    matchedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
])

const startChat = (match) => {
  // Navigate to chat with this match
  router.push('/chat')
}

const formatMatchDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'today'
  if (diffInDays === 1) return 'yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  return `${Math.floor(diffInDays / 30)} months ago`
}
</script> 