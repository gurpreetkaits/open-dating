import { defineStore } from 'pinia'
import chatService from '../services/chatService.js'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatList: [],
    messages: [],
    currentChatId: null,
    isLoading: false,
    isSending: false,
    error: null,
    pagination: {
      currentPage: 1,
      hasMore: true,
      total: 0
    }
  }),

  getters: {
    getCurrentChat: (state) => {
      return state.chatList.find(chat => chat.id === state.currentChatId)
    },
    
    getUnreadCount: (state) => {
      return state.chatList.reduce((total, chat) => total + chat.unreadCount, 0)
    },

    getMessagesByChat: (state) => (chatId) => {
      return state.messages.filter(message => message.chatId === chatId)
    }
  },

  actions: {
    /**
     * Fetch list of user's chats
     */
    async fetchChatList() {
      this.isLoading = true
      this.error = null

      try {
        const response = await chatService.getChatList()
        this.chatList = response.chats || []
      } catch (error) {
        this.error = 'Failed to fetch chat list'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Fetch messages for a specific chat
     */
    async fetchMessages(chatId, page = 1, loadMore = false) {
      this.isLoading = true
      this.error = null

      try {
        if (!loadMore) {
          this.messages = []
          this.pagination.currentPage = 1
        }

        const response = await chatService.getMessages(chatId, page)
        const newMessages = response.messages || []
        
        if (loadMore) {
          this.messages = [...newMessages, ...this.messages]
        } else {
          this.messages = newMessages
          this.currentChatId = chatId
        }

        this.pagination = {
          currentPage: response.currentPage || page,
          hasMore: response.hasMore || false,
          total: response.total || newMessages.length
        }

        // Mark messages as read
        const unreadMessages = newMessages.filter(msg => !msg.isRead && msg.senderId !== this.currentUserId)
        if (unreadMessages.length > 0) {
          this.markMessagesAsRead(chatId, unreadMessages.map(msg => msg.id))
        }
      } catch (error) {
        this.error = 'Failed to fetch messages'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Send a message
     */
    async sendMessage(chatId, content) {
      if (!content.trim()) return

      this.isSending = true
      this.error = null

      // Create optimistic message
      const tempMessage = {
        id: `temp-${Date.now()}`,
        chatId,
        senderId: this.currentUserId || 1,
        content: content.trim(),
        status: 'sending',
        createdAt: new Date().toISOString(),
        isRead: false
      }

      // Add to messages immediately for better UX
      this.messages.push(tempMessage)
      this.updateChatLastMessage(chatId, tempMessage)

      try {
        const response = await chatService.sendMessage(chatId, content.trim())
        // Replace temp message with real message
        const messageIndex = this.messages.findIndex(msg => msg.id === tempMessage.id)
        if (messageIndex !== -1) {
          this.messages[messageIndex] = response.message
        }
        this.updateChatLastMessage(chatId, response.message)
      } catch (error) {
        // Remove temp message on error
        this.messages = this.messages.filter(msg => msg.id !== tempMessage.id)
        this.error = 'Failed to send message'
      } finally {
        this.isSending = false
      }
    },

    /**
     * Mark messages as read
     */
    async markMessagesAsRead(chatId, messageIds) {
      try {
        await chatService.markAsRead(chatId, messageIds)
        // Update local messages
        this.messages.forEach(message => {
          if (messageIds.includes(message.id)) {
            message.isRead = true
          }
        })

        // Update chat unread count
        const chat = this.chatList.find(c => c.id === chatId)
        if (chat) {
          chat.unreadCount = Math.max(0, chat.unreadCount - messageIds.length)
        }
      } catch (error) {
        // Silently fail for read receipts
      }
    },

    /**
     * Create a new chat
     */
    async createChat(userId) {
      this.isLoading = true
      this.error = null

      try {
        const response = await chatService.createChat(userId)
        const newChat = response.chat
        
        // Check if chat already exists in the list
        const existingChatIndex = this.chatList.findIndex(chat => chat.id === newChat.id)
        if (existingChatIndex >= 0) {
          this.chatList[existingChatIndex] = newChat
        } else {
          this.chatList.unshift(newChat)
        }
        
        return newChat
      } catch (error) {
        this.error = 'Failed to create chat'
        return null
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Load more messages (pagination)
     */
    async loadMoreMessages() {
      if (!this.pagination.hasMore || this.isLoading) return

      await this.fetchMessages(
        this.currentChatId, 
        this.pagination.currentPage + 1, 
        true
      )
    },

    /**
     * Update chat's last message
     */
    updateChatLastMessage(chatId, message) {
      const chat = this.chatList.find(c => c.id === chatId)
      if (chat) {
        chat.lastMessage = message
        chat.updatedAt = message.createdAt
        
        // Move chat to top of list
        const chatIndex = this.chatList.findIndex(c => c.id === chatId)
        if (chatIndex > 0) {
          const [movedChat] = this.chatList.splice(chatIndex, 1)
          this.chatList.unshift(movedChat)
        }
      }
    },

    /**
     * Add incoming message (from websocket/polling)
     */
    addIncomingMessage(message) {
      // Only add if message doesn't already exist
      const exists = this.messages.some(msg => msg.id === message.id)
      if (!exists) {
        this.messages.push(message)
        this.updateChatLastMessage(message.chatId, message)
        
        // Increment unread count if not from current user
        if (message.senderId !== this.currentUserId) {
          const chat = this.chatList.find(c => c.id === message.chatId)
          if (chat) {
            chat.unreadCount = (chat.unreadCount || 0) + 1
          }
        }
      }
    },

    /**
     * Clear all data
     */
    clearChatData() {
      this.chatList = []
      this.messages = []
      this.currentChatId = null
      this.error = null
      this.pagination = {
        currentPage: 1,
        hasMore: true,
        total: 0
      }
    },

    /**
     * Set current user ID (should be called when user logs in)
     */
    setCurrentUserId(userId) {
      this.currentUserId = userId
    }
  }
}) 