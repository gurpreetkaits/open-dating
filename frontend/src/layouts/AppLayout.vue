<template>
  <div class="app-layout">
    <!-- Navigation -->
    <AppNavigation />
    
    <!-- Main Content -->
    <main class="app-main">
      <slot />
    </main>
    
    <!-- Mobile Navigation -->
    <MobileNavigation v-if="isMobile" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppNavigation from '../components/layout/AppNavigation.vue'
import MobileNavigation from '../components/layout/MobileNavigation.vue'
import { useBreakpoint } from '../composables/useBreakpoint.js'

const { isMobile } = useBreakpoint()
</script>

<style scoped>
.app-layout {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-main {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  background-color: #f9fafb;
}
</style> 