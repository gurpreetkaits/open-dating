export const APP_CONFIG = {
  name: 'Open Dating',
  description: 'Find your perfect match',
  version: '1.0.0',
}

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    profile: '/api/auth/profile',
  },
  users: {
    profile: '/api/users/profile',
    preferences: '/api/users/preferences',
    photos: '/api/users/photos',
  },
  matching: {
    discover: '/api/matching/discover',
    like: '/api/matching/like',
    pass: '/api/matching/pass',
    matches: '/api/matching/matches',
  },
  chat: {
    conversations: '/api/chat/conversations',
    messages: '/api/chat/messages',
    send: '/api/chat/send',
  },
}

export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
  },
  app: {
    dashboard: '/dashboard',
    discover: '/discover',
    matches: '/matches',
    chat: '/chat',
    profile: '/profile',
    settings: '/settings',
  },
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

export const STORAGE_KEYS = {
  authToken: 'auth_token',
  user: 'user',
  preferences: 'user_preferences',
}

export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
  },
  profile: {
    nameMaxLength: 50,
    bioMaxLength: 500,
    minAge: 18,
    maxAge: 120,
  },
}

export const UI_CONSTANTS = {
  colors: {
    primary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      900: '#111827',
    },
    secondary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      900: '#111827',
    },
    accent: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
  },
  animations: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  theme: {
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      dark: '#111827',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      inverse: '#ffffff',
    },
    border: {
      light: '#e5e7eb',
      dark: '#374151',
    },
  },
} 