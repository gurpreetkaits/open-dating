<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="space-y-8 p-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">{{ msg }}</h1>
      <p class="text-lg text-base-content/70 mb-6">
        You've successfully created a project with
        <a href="https://vite.dev/" target="_blank" rel="noopener" class="link link-primary">Vite</a> +
        <a href="https://vuejs.org/" target="_blank" rel="noopener" class="link link-primary">Vue 3</a> +
        <a href="https://daisyui.com/" target="_blank" rel="noopener" class="link link-secondary">Daisy UI</a>
      </p>
    </div>

    <!-- Buttons Demo -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Daisy UI Buttons</h2>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-accent">Accent</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-link">Link</button>
        </div>
      </div>
    </div>

    <!-- Card Demo -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <div class="bg-gradient-to-br from-purple-400 to-blue-500 w-full h-48 flex items-center justify-center">
            <span class="text-white text-xl font-bold">Image Placeholder</span>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">Card Title</h2>
          <p>This is a beautiful card component from Daisy UI!</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Form Elements</h2>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">What is your name?</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Remember me</span>
              <input type="checkbox" checked="checked" class="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Demo -->
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>Daisy UI is successfully configured! 🎉</span>
    </div>

    <!-- Badge Demo -->
    <div class="flex flex-wrap gap-2 justify-center">
      <div class="badge badge-primary">Primary</div>
      <div class="badge badge-secondary">Secondary</div>
      <div class="badge badge-accent">Accent</div>
      <div class="badge badge-ghost">Ghost</div>
    </div>
  </div>
</template>
