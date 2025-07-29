export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required'
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters long`
    }
    return null
  },

  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters long'
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter'
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter'
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number'
    return null
  },

  confirmPassword: (password) => (value) => {
    if (value !== password) {
      return 'Passwords do not match'
    }
    return null
  },

  phone: (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    if (value && !phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
    return null
  },

  age: (value) => {
    const age = parseInt(value)
    if (value && (isNaN(age) || age < 18 || age > 120)) {
      return 'Age must be between 18 and 120'
    }
    return null
  },
}

export function validateField(value, rules = []) {
  for (const rule of rules) {
    const error = rule(value)
    if (error) {
      return error
    }
  }
  return null
}

export function validateForm(formData, validationRules) {
  const errors = {}
  let isValid = true

  for (const [field, rules] of Object.entries(validationRules)) {
    const error = validateField(formData[field], rules)
    if (error) {
      errors[field] = error
      isValid = false
    }
  }

  return { isValid, errors }
} 