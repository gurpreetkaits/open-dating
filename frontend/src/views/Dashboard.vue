<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Main Content -->
      <div class="max-w-full xl:max-w-7xl mx-auto py-4 lg:py-6 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Discover People
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                Find your perfect match from {{ displayedProfiles.length }} profiles
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="loadMoreProfiles"
                class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Load More
              </button>
              <button
                @click="toggleView"
                class="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Squares2X2Icon v-if="viewMode === 'list'" class="w-4 h-4" />
                <ListBulletIcon v-else class="w-4 h-4" />
                {{ viewMode === 'grid' ? 'List View' : 'Grid View' }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <!-- Main Profiles Section -->
          <div class="flex-1 lg:flex-[3] min-w-0">
            <!-- Grid View -->
            <div 
              v-if="viewMode === 'grid'"
              class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
            >
              <DiscoverCard
                v-for="profile in displayedProfiles"
                :key="profile.id"
                :profile="profile"
                :view-mode="viewMode"
                @like="handleLike"
                @pass="handlePass"
                @super-like="handleSuperLike"
                @bookmark="handleBookmark"
                class="transform hover:scale-[1.02] transition-transform duration-200"
              />
            </div>
            
            <!-- List View -->
            <div v-else class="space-y-4 lg:space-y-6">
              <DiscoverCard
                v-for="profile in displayedProfiles"
                :key="profile.id"
                :profile="profile"
                :view-mode="viewMode"
                @like="handleLike"
                @pass="handlePass"
                @super-like="handleSuperLike"
                @bookmark="handleBookmark"
                class="w-full"
              />
            </div>
            
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
            
            <!-- Empty State -->
            <div v-if="displayedProfiles.length === 0 && !isLoading" class="text-center py-12">
              <UserIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No more profiles</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Check back later for new people to discover!</p>
              <button
                @click="refreshProfiles"
                class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="w-full lg:w-80 lg:flex-shrink-0">
            <div class="lg:sticky lg:top-6 flex flex-col gap-4 lg:gap-6">
            <!-- Quick Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today</h3>
              <div class="space-y-2 lg:space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Likes</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ stats.likes }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Matches</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ stats.matches }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Views</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ stats.views }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Matches -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Matches</h3>
              <div class="space-y-2 lg:space-y-3">
                <div 
                  v-for="match in recentMatches"
                  :key="match.id"
                  class="flex items-center space-x-3"
                >
                  <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ match.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ match.time }}</p>
                  </div>
                </div>
              </div>
              <router-link 
                to="/matches" 
                class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mt-4"
              >
                View all matches
                <ChevronRightIcon class="w-4 h-4 ml-1" />
              </router-link>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div class="space-y-2">
                <router-link 
                  to="/chat" 
                  class="flex items-center p-2 lg:p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChatBubbleLeftRightIcon class="w-5 h-5 mr-3" />
                  <span class="text-sm">Messages</span>
                </router-link>
                <router-link 
                  to="/profile" 
                  class="flex items-center p-2 lg:p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <UserIcon class="w-5 h-5 mr-3" />
                  <span class="text-sm">Edit Profile</span>
                </router-link>
                <router-link 
                  to="/settings" 
                  class="flex items-center p-2 lg:p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import {
  UserIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CogIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/vue/24/outline'
import AppLayout from '../layouts/AppLayout.vue'
import DiscoverCard from '../components/features/matching/DiscoverCard.vue'
import { mockProfiles, getRandomProfiles } from '../data/mockProfiles.js'

const router = useRouter()
const authStore = useAuthStore()

const displayedProfiles = ref([])
const isLoading = ref(false)
const viewMode = ref('grid')
const stats = ref({
  likes: 12,
  matches: 3,
  views: 24
})
const recentMatches = ref([
  { id: 1, name: 'Emma', time: '2 hours ago' },
  { id: 2, name: 'Lisa', time: '5 hours ago' }
])

const loadMoreProfiles = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  const newProfiles = getRandomProfiles(6)
  displayedProfiles.value = [...displayedProfiles.value, ...newProfiles]
  isLoading.value = false
}

const refreshProfiles = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  displayedProfiles.value = getRandomProfiles(6)
  isLoading.value = false
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const handleLike = (profileId) => {
  console.log('Liked profile:', profileId)
  // Remove from displayed profiles
  displayedProfiles.value = displayedProfiles.value.filter(p => p.id !== profileId)
  // Update stats
  stats.value.likes++
}

const handlePass = (profileId) => {
  console.log('Passed profile:', profileId)
  // Remove from displayed profiles
  displayedProfiles.value = displayedProfiles.value.filter(p => p.id !== profileId)
}

const handleSuperLike = (profileId) => {
  console.log('Super liked profile:', profileId)
  // Remove from displayed profiles and potentially create match
  displayedProfiles.value = displayedProfiles.value.filter(p => p.id !== profileId)
  stats.value.likes++
  stats.value.matches++
}

const handleBookmark = (profileId) => {
  console.log('Bookmarked profile:', profileId)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

onMounted(() => {
  // Load initial profiles
  displayedProfiles.value = getRandomProfiles(6)
})
</script> 