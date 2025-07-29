import { defineStore } from 'pinia'
import authService from '../services/authService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    authError: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    hasAuthError: (state) => !!state.authError,
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.authError = null

      try {
        const response = await authService.login(credentials)
        this.user = response.user
        this.isAuthenticated = true
        return response
      } catch (error) {
        this.authError = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async register(userData) {
      this.isLoading = true
      this.authError = null

      try {
        const response = await authService.register(userData)
        this.user = response.user
        this.isAuthenticated = true
        return response
      } catch (error) {
        this.authError = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async registerWithProfile(userData) {
      this.isLoading = true
      this.authError = null

      try {
        const response = await authService.registerWithProfile(userData)
        this.user = response.user
        this.isAuthenticated = true
        return response
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.authError = error.response.data.message
        } else {
          this.authError = error.message
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true

      try {
        await authService.logout()
        this.user = null
        this.isAuthenticated = false
        this.authError = null
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.isLoading = false
      }
    },

    clearAuthError() {
      this.authError = null
    },

    initializeAuth() {
      this.user = authService.getCurrentUser()
      this.isAuthenticated = authService.isAuthenticated()
    },
  },
}) 