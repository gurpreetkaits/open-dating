<template>
  <div class="text-center mb-8">
    <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
      <HeartIcon class="w-8 h-8 text-white" />
    </div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
    <p class="text-gray-600">{{ subtitle }}</p>
  </div>

  <!-- Error Message -->
  <div v-if="authStore.hasAuthError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
    <div class="flex items-center">
      <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mr-2" />
      <p class="text-red-700 text-sm">{{ authStore.authError }}</p>
    </div>
  </div>

  <!-- Form Content -->
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <slot />
    
    <PrimaryButton
      type="submit"
      :loading="authStore.isLoading"
      :loading-text="loadingText"
      full-width
    >
      {{ submitText }}
    </PrimaryButton>
  </form>

  <!-- Footer Link -->
  <div class="mt-6 text-center">
    <p class="text-gray-600">
      {{ footerText }}
      <router-link
        :to="footerLinkTo"
        class="text-purple-600 hover:text-purple-800 font-semibold ml-1"
      >
        {{ footerLinkText }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { HeartIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../../stores/auth.js'
import PrimaryButton from '../../ui/buttons/PrimaryButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  submitText: {
    type: String,
    required: true,
  },
  loadingText: {
    type: String,
    required: true,
  },
  footerText: {
    type: String,
    required: true,
  },
  footerLinkText: {
    type: String,
    required: true,
  },
  footerLinkTo: {
    type: String,
    required: true,
  },
})

defineEmits(['submit'])

const authStore = useAuthStore()

const handleSubmit = (event) => {
  authStore.clearAuthError()
  $emit('submit', event)
}
</script> 