// User types
export const UserModel = {
  id: null,
  name: '',
  email: '',
  avatar: '',
  birthDate: '',
  bio: '',
  location: {
    latitude: 0,
    longitude: 0,
    city: '',
    country: '',
  },
  photos: [],
  interests: [],
  preferences: {
    ageRange: { min: 18, max: 60 },
    maxDistance: 50,
    interestedIn: 'all', // 'men', 'women', 'all'
  },
  isOnline: false,
  lastSeen: null,
  verified: false,
  createdAt: '',
  updatedAt: '',
}

// Match types
export const MatchModel = {
  id: null,
  userId: null,
  matchedUserId: null,
  status: 'pending', // 'pending', 'matched', 'unmatched'
  likedAt: '',
  matchedAt: '',
  user: UserModel,
  matchedUser: UserModel,
}

// Message types
export const MessageModel = {
  id: null,
  conversationId: null,
  senderId: null,
  content: '',
  type: 'text', // 'text', 'image', 'gif'
  readAt: null,
  createdAt: '',
  sender: UserModel,
}

// Conversation types
export const ConversationModel = {
  id: null,
  participants: [],
  lastMessage: MessageModel,
  unreadCount: 0,
  createdAt: '',
  updatedAt: '',
}

// API Response types
export const ApiResponse = {
  success: true,
  data: null,
  message: '',
  errors: {},
}

// Form validation types
export const ValidationResult = {
  isValid: false,
  errors: {},
}

// Auth types
export const AuthUser = {
  id: null,
  name: '',
  email: '',
  avatar: '',
  emailVerifiedAt: null,
  createdAt: '',
  updatedAt: '',
}

export const LoginCredentials = {
  email: '',
  password: '',
  remember: false,
}

export const RegisterData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
}

// Notification types
export const NotificationModel = {
  id: null,
  type: '', // 'match', 'message', 'like', 'profile_view'
  title: '',
  message: '',
  data: {},
  readAt: null,
  createdAt: '',
} 