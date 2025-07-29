<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
// Clean layout for authentication pages with white/dark theme
</script>

<style scoped>
.auth-layout {
  /* width: 100vw; */
  /* height: 100vh; */
  min-height: 100vh;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-container {
  width: 100%;
  max-width: 28rem;
}

.auth-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  border: 1px solid #e5e7eb;
}

@media (max-width: 640px) {
  .auth-layout {
    padding: 0.5rem;
  }
  
  .auth-card {
    padding: 1.5rem;
  }
}
</style> 