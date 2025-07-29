import ApiService from './api.js'

class AuthService {
  async login(credentials) {
    try {
      const response = await ApiService.post('/auth/login', credentials)
      if (response.token) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      // Mock response for development when backend is not available
      console.warn('Backend not available, using mock login')
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          name: 'Demo User',
          email: credentials.email,
          avatar: null
        }
      }
      localStorage.setItem('auth_token', mockResponse.token)
      localStorage.setItem('user', JSON.stringify(mockResponse.user))
      return mockResponse
    }
  }

  async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData)
      if (response.token) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      // Mock response for development when backend is not available
      console.warn('Backend not available, using mock registration')
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          name: userData.name,
          email: userData.email,
          avatar: null
        }
      }
      localStorage.setItem('auth_token', mockResponse.token)
      localStorage.setItem('user', JSON.stringify(mockResponse.user))
      return mockResponse
    }
  }

  async registerWithProfile(userData) {
    const formData = new FormData()
    
    // Add basic fields
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('password_confirmation', userData.password_confirmation)
    
    // Add profile video
    if (userData.profile_video) {
      formData.append('profile_video', userData.profile_video)
    }
    
    // Add profile photos
    if (userData.profile_photos && userData.profile_photos.length > 0) {
      userData.profile_photos.forEach((photo, index) => {
        formData.append(`profile_photos[${index}]`, photo)
      })
    }

    try {
      const response = await ApiService.postFormData('/register', formData)
      if (response.token) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      await ApiService.post('/auth/logout')
    } catch (error) {
      console.warn('Backend not available for logout')
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('user')
    return userJson ? JSON.parse(userJson) : null
  }

  getToken() {
    return localStorage.getItem('auth_token')
  }

  isAuthenticated() {
    return !!this.getToken()
  }
}

export default new AuthService() 