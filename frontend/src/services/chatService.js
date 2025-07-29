import api from './api.js'

class ChatService {
  async getChatList() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      chats: [
        {
          id: 1,
          user: {
            id: 2,
            name: 'Emma Johnson',
            isOnline: true
          },
          lastMessage: {
            id: 1,
            content: 'Hey! How are you doing?',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            senderId: 2
          },
          unreadCount: 2,
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          user: {
            id: 3,
            name: 'Sarah Miller',
            isOnline: false
          },
          lastMessage: {
            id: 2,
            content: 'Thanks for the coffee date! ☕',
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            senderId: 1
          },
          unreadCount: 0,
          updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          user: {
            id: 4,
            name: 'Lisa Brown',
            isOnline: true
          },
          lastMessage: {
            id: 3,
            content: 'Looking forward to our hiking trip!',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            senderId: 4
          },
          unreadCount: 1,
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  }

  async getMessages(chatId, page = 1, limit = 50) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return this.getSampleMessages(chatId, page)
  }

  async sendMessage(chatId, content) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      message: {
        id: Date.now(),
        chatId: parseInt(chatId),
        senderId: 1,
        content: content,
        status: 'sent',
        createdAt: new Date().toISOString(),
        isRead: false
      }
    }
  }

  async markAsRead(chatId, messageIds) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return { success: true }
  }

  async createChat(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return {
      chat: {
        id: Date.now(),
        user: {
          id: userId,
          name: 'New User',
          isOnline: Math.random() > 0.5
        },
        lastMessage: null,
        unreadCount: 0,
        updatedAt: new Date().toISOString()
      }
    }
  }

  async deleteChat(chatId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return { success: true }
  }

  async searchMessages(chatId, query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const messages = this.getSampleMessages(chatId, 1).messages
    const filteredMessages = messages.filter(msg => 
      msg.content.toLowerCase().includes(query.toLowerCase())
    )
    
    return {
      messages: filteredMessages,
      total: filteredMessages.length
    }
  }

  getSampleMessages(chatId, page = 1) {
    const baseTime = Date.now()
    const messages = {
      1: [
        {
          id: 1,
          chatId: 1,
          senderId: 2,
          content: 'Hey! How are you doing?',
          status: 'read',
          createdAt: new Date(baseTime - 3 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: 2,
          chatId: 1,
          senderId: 1,
          content: 'I\'m doing great! Thanks for asking. How about you?',
          status: 'delivered',
          createdAt: new Date(baseTime - 2.5 * 60 * 60 * 1000).toISOString(),
          isRead: false
        },
        {
          id: 3,
          chatId: 1,
          senderId: 2,
          content: 'Pretty good! Just finished work. Want to grab coffee sometime this week?',
          status: 'read',
          createdAt: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: 4,
          chatId: 1,
          senderId: 1,
          content: 'That sounds perfect! How about Wednesday afternoon?',
          status: 'delivered',
          createdAt: new Date(baseTime - 1.5 * 60 * 60 * 1000).toISOString(),
          isRead: false
        }
      ],
      2: [
        {
          id: 5,
          chatId: 2,
          senderId: 1,
          content: 'Thanks for the coffee date! ☕',
          status: 'read',
          createdAt: new Date(baseTime - 5 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: 6,
          chatId: 2,
          senderId: 3,
          content: 'I had such a great time! We should do it again soon 😊',
          status: 'delivered',
          createdAt: new Date(baseTime - 4.5 * 60 * 60 * 1000).toISOString(),
          isRead: false
        },
        {
          id: 7,
          chatId: 2,
          senderId: 1,
          content: 'Absolutely! Maybe next time we could try that new place downtown?',
          status: 'read',
          createdAt: new Date(baseTime - 4 * 60 * 60 * 1000).toISOString(),
          isRead: true
        }
      ],
      3: [
        {
          id: 8,
          chatId: 3,
          senderId: 4,
          content: 'Looking forward to our hiking trip!',
          status: 'read',
          createdAt: new Date(baseTime - 24 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: 9,
          chatId: 3,
          senderId: 1,
          content: 'Me too! I\'ve been checking the weather and it looks perfect for Saturday.',
          status: 'delivered',
          createdAt: new Date(baseTime - 23 * 60 * 60 * 1000).toISOString(),
          isRead: false
        },
        {
          id: 10,
          chatId: 3,
          senderId: 4,
          content: 'Great! Don\'t forget to bring your camera 📸',
          status: 'read',
          createdAt: new Date(baseTime - 22 * 60 * 60 * 1000).toISOString(),
          isRead: true
        }
      ]
    }

    return {
      messages: messages[chatId] || [],
      currentPage: page,
      hasMore: false,
      total: (messages[chatId] || []).length
    }
  }
}

export default new ChatService() 