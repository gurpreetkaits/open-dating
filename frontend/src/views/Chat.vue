<template>
  <AppLayout>
    <div class="h-screen flex bg-gray-50 dark:bg-gray-900">
      <!-- Chat List Sidebar -->
      <div class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <!-- Header -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
        </div>
        
        <!-- Chat List -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-2 space-y-1">
            <div 
              v-for="chat in chatStore.chatList" 
              :key="chat.id"
              @click="selectChat(chat)"
              :class="[
                'flex items-center p-3 rounded-lg cursor-pointer transition-colors',
                selectedChatId === chat.id 
                  ? 'bg-gray-100 dark:bg-gray-700' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              ]"
            >
              <!-- Avatar -->
              <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                <UserIcon class="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              
              <!-- Chat Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ chat.user.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTime(chat.lastMessage?.createdAt) }}
                  </p>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {{ chat.lastMessage?.content || 'No messages yet' }}
                </p>
              </div>
              
              <!-- Unread Badge -->
              <div 
                v-if="chat.unreadCount > 0"
                class="ml-2 w-5 h-5 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center"
              >
                <span class="text-xs font-medium text-white dark:text-gray-900">
                  {{ chat.unreadCount > 9 ? '9+' : chat.unreadCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col">
        <div v-if="selectedChat" class="h-full flex flex-col">
          <!-- Chat Header -->
          <div class="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
              <UserIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ selectedChat.user.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ selectedChat.user.isOnline ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>

          <!-- Messages Area -->
          <div 
            ref="messagesContainer"
            class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
          >
            <MessageBubble
              v-for="message in chatStore.messages"
              :key="message.id"
              :message="message"
              :is-own="message.senderId === authStore.user?.id"
            />
            
            <!-- Loading indicator -->
            <div v-if="chatStore.isLoading" class="flex justify-center">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-end space-x-3">
              <div class="flex-1">
                <textarea
                  ref="messageInput"
                  v-model="newMessage"
                  @keydown="handleKeyDown"
                  @input="adjustTextareaHeight"
                  placeholder="Type a message..."
                  rows="1"
                  class="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400"
                ></textarea>
              </div>
              <button
                @click="sendMessage"
                :disabled="!newMessage.trim() || chatStore.isSending"
                class="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon v-if="!chatStore.isSending" class="w-5 h-5" />
                <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-gray-900"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- No Chat Selected -->
        <div v-else class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div class="text-center">
            <ChatBubbleLeftRightIcon class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Choose a chat from the sidebar to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import MessageBubble from '../components/features/chat/MessageBubble.vue'
import { useChatStore } from '../stores/chat.js'
import { useAuthStore } from '../stores/auth.js'
import {
  UserIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'

const chatStore = useChatStore()
const authStore = useAuthStore()

const selectedChatId = ref(null)
const selectedChat = ref(null)
const newMessage = ref('')
const messagesContainer = ref(null)
const messageInput = ref(null)

const selectChat = async (chat) => {
  selectedChatId.value = chat.id
  selectedChat.value = chat
  await chatStore.fetchMessages(chat.id)
  scrollToBottom()
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedChatId.value) return
  
  const messageContent = newMessage.value.trim()
  newMessage.value = ''
  adjustTextareaHeight()
  
  await chatStore.sendMessage(selectedChatId.value, messageContent)
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const adjustTextareaHeight = () => {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

// Watch for new messages and scroll to bottom
watch(() => chatStore.messages, () => {
  scrollToBottom()
}, { deep: true })

onMounted(async () => {
  await chatStore.fetchChatList()
})
</script> 