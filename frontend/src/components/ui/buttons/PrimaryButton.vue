<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <span v-if="!loading" class="flex items-center justify-center">
      <slot name="icon" />
      <slot />
    </span>
    <span v-else class="flex items-center justify-center">
      <LoadingSpinner class="mr-2" />
      {{ loadingText || 'Loading...' }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg',
  }
  
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-300',
  }
  
  const widthClass = props.fullWidth ? 'w-full' : ''
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    widthClass,
  ].filter(Boolean).join(' ')
})
</script> 