<template>
  <AuthLayout>
    <!-- Logo and Title -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
        <HeartIcon class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Join Open Dating</h1>
      <p class="text-gray-600">Create your profile with video and photos</p>
    </div>

    <!-- Error Message -->
    <div v-if="authStore.hasAuthError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
      <div class="flex items-center">
        <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mr-2" />
        <p class="text-red-700 text-sm">{{ authStore.authError }}</p>
      </div>
    </div>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Basic Information</h3>
        
        <FormInput
          v-model="registerForm.name"
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          :icon="UserIcon"
          :error-message="validationErrors.name"
          required
        />

        <FormInput
          v-model="registerForm.email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          :icon="AtSymbolIcon"
          :error-message="validationErrors.email"
          required
        />

        <FormInput
          v-model="registerForm.password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          :icon="LockClosedIcon"
          :error-message="validationErrors.password"
          hint="Must be at least 8 characters long"
          required
        />

        <FormInput
          v-model="registerForm.password_confirmation"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          :icon="LockClosedIcon"
          :error-message="validationErrors.password_confirmation"
          required
        />
      </div>

      <!-- Profile Media -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Profile Media</h3>
        <p class="text-sm text-gray-600">Make your profile stand out with a video and photos!</p>
        
        <VideoUpload
          v-model="registerForm.profileVideo"
          label="Profile Video"
          :error-message="validationErrors.profile_video"
          hint="Upload a short video to showcase your personality"
          required
        />

        <PhotoUpload
          v-model="registerForm.profilePhotos"
          label="Profile Photos"
          :required-count="4"
          :error-messages="validationErrors.profile_photos"
          :general-error="validationErrors.profile_photos_general"
          required
        />
      </div>

      <div class="flex items-start">
        <input
          v-model="registerForm.terms"
          type="checkbox"
          required
          class="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500 mt-1"
        />
        <label class="ml-2 text-sm text-gray-600">
          I agree to the
          <a href="#" class="text-gray-900 hover:text-gray-700 font-medium">Terms of Service</a>
          and
          <a href="#" class="text-gray-900 hover:text-gray-700 font-medium">Privacy Policy</a>
        </label>
      </div>

      <PrimaryButton
        type="submit"
        :disabled="!isFormValid"
        :loading="authStore.isLoading"
        loading-text="Creating Profile..."
        full-width
      >
        Create Profile
      </PrimaryButton>
    </form>

    <!-- Login Link -->
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Already have an account?
        <router-link
          to="/login"
          class="text-gray-900 hover:text-gray-700 font-semibold ml-1"
        >
          Sign in here
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import {
  HeartIcon,
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import AuthLayout from '../layouts/AuthLayout.vue'
import FormInput from '../components/ui/forms/FormInput.vue'
import VideoUpload from '../components/ui/forms/VideoUpload.vue'
import PhotoUpload from '../components/ui/forms/PhotoUpload.vue'
import PrimaryButton from '../components/ui/buttons/PrimaryButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  profileVideo: null,
  profilePhotos: [],
  terms: false,
})

const validationErrors = ref({})

const isFormValid = computed(() => {
  return (
    registerForm.value.name &&
    registerForm.value.email &&
    registerForm.value.password &&
    registerForm.value.password_confirmation &&
    registerForm.value.password === registerForm.value.password_confirmation &&
    registerForm.value.profileVideo &&
    registerForm.value.profilePhotos.length === 4 &&
    registerForm.value.terms
  )
})

const handleRegister = async () => {
  if (!isFormValid.value) {
    return
  }

  authStore.clearAuthError()
  validationErrors.value = {}
  
  try {
    await authStore.registerWithProfile({
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
      password_confirmation: registerForm.value.password_confirmation,
      profile_video: registerForm.value.profileVideo,
      profile_photos: registerForm.value.profilePhotos,
    })
    
    router.push('/dashboard')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      validationErrors.value = error.response.data.errors
    }
  }
}

onMounted(() => {
  authStore.clearAuthError()
})
</script> 