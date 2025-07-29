<template>
  <AuthLayout>
    <!-- Logo and Title -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
        <HeartIcon class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
      <p class="text-gray-600">Find your perfect match with Open Dating</p>
    </div>

    <!-- Error Message -->
    <div v-if="authStore.hasAuthError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
      <div class="flex items-center">
        <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mr-2" />
        <p class="text-red-700 text-sm">{{ authStore.authError }}</p>
      </div>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-6">
      <FormInput
        v-model="loginForm.email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        :icon="AtSymbolIcon"
        required
      />

      <FormInput
        v-model="loginForm.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :icon="LockClosedIcon"
        required
      />

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input
            v-model="loginForm.remember"
            type="checkbox"
            class="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" class="text-sm text-gray-900 hover:text-gray-700 font-medium">
          Forgot password?
        </a>
      </div>

      <PrimaryButton
        type="submit"
        :loading="authStore.isLoading"
        loading-text="Signing In..."
        full-width
      >
        Sign In
      </PrimaryButton>
    </form>

    <!-- Register Link -->
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Don't have an account?
        <router-link
          to="/register"
          class="text-gray-900 hover:text-gray-700 font-semibold ml-1"
        >
          Sign up now
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import {
  HeartIcon,
  AtSymbolIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import AuthLayout from '../layouts/AuthLayout.vue'
import FormInput from '../components/ui/forms/FormInput.vue'
import PrimaryButton from '../components/ui/buttons/PrimaryButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  email: '',
  password: '',
  remember: false,
})

const handleLogin = async () => {
  authStore.clearAuthError()
  
  try {
    await authStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      remember: loginForm.value.remember,
    })
    
    router.push('/dashboard')
  } catch (error) {
    // Error is handled by the store
  }
}

onMounted(() => {
  authStore.clearAuthError()
})
</script> 