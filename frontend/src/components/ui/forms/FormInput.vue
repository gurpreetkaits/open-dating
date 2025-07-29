<template>
  <div class="space-y-2">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <component
        :is="iconComponent"
        v-if="icon"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
      />
      
      <input
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <EyeIcon v-if="!showPassword" class="w-5 h-5" />
        <EyeSlashIcon v-else class="w-5 h-5" />
      </button>
    </div>
    
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const showPassword = ref(false)
const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const iconComponent = computed(() => {
  return props.icon
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const inputClasses = computed(() => {
  const baseClasses = 'w-full py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200'
  const paddingClasses = props.icon ? 'pl-10 pr-4' : 'px-4'
  const errorClasses = props.error ? 'border-red-300 focus:ring-red-500' : ''
  const disabledClasses = props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''
  
  return [baseClasses, paddingClasses, errorClasses, disabledClasses].filter(Boolean).join(' ')
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script> 