<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Meal } from '@/views/HomeView.vue'
import RecipeList from '@/components/RecipeList.vue'

const recipes = ref<Meal[]>([])

onMounted(() => {
  const storedFavorites = localStorage.getItem('favoritedMeals')
  recipes.value = JSON.parse(storedFavorites || '[]')
})
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-bold">Your Recipes: {{ recipes.length }}</h1>
    <RecipeList :meals="recipes" :favoritedMeals="recipes" />
  </div>
</template>
