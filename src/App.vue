<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="mb-4 border-b">
    <nav class="flex gap-3 mb-2">
      <RouterLink to="/" :class="{ 'text-blue-500': $route.path === '/' }"
        >Search Recipes</RouterLink
      >
      <RouterLink to="/your-recipes" :class="{ 'text-blue-500': $route.path === '/your-recipes' }"
        >Your Recipes</RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>
