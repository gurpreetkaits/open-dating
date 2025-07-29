<template>
  <div class="relative" ref="dropdown">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <img
        :src="user?.avatar || '/default-avatar.jpg'"
        :alt="user?.name"
        class="w-8 h-8 rounded-full object-cover"
      />
      <ChevronDownIcon class="w-4 h-4 text-gray-500" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
          <p class="text-sm text-gray-500 truncate">{{ user?.email }}</p>
        </div>

        <router-link
          to="/profile"
          @click="isOpen = false"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <UserIcon class="w-4 h-4 mr-3" />
          Profile
        </router-link>

        <router-link
          to="/settings"
          @click="isOpen = false"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <CogIcon class="w-4 h-4 mr-3" />
          Settings
        </router-link>

        <div class="border-t border-gray-100 my-1"></div>

        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <ArrowRightOnRectangleIcon class="w-4 h-4 mr-3" />
          Sign out
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()
const dropdown = ref(null)
const isOpen = ref(false)

const user = computed(() => authStore.currentUser)

const handleLogout = async () => {
  isOpen.value = false
  await authStore.logout()
  router.push('/login')
}

const closeDropdown = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script> 