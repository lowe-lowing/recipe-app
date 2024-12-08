<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue'
import { ref, onMounted, computed } from 'vue'

// Type definitions for API data
export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

interface ApiResponse {
  meals: Meal[] | null
  error?: string
}
// Reactive variables
const favoritedMeals = ref<Meal[]>([])

// Fetch favorites from localStorage on initialization
onMounted(() => {
  const storedFavorites = localStorage.getItem('favoritedMeals')
  if (storedFavorites) {
    favoritedMeals.value = JSON.parse(storedFavorites)
  }
})
// Reactive variables
const query = ref('') // User's search query
const res = ref<ApiResponse | null>(null)
const isLoading = ref(false)

const meals = computed(() => res.value?.meals || [])
const hasError = computed(() => !!res.value?.error)

// Function to fetch data
const fetchRecipes = async () => {
  if (!query.value.trim()) {
    res.value = { meals: null, error: 'The search field cannot be empty.' }
    return
  }

  isLoading.value = true
  try {
    const response = await fetch(
      `https://themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.value)}`,
    )
    if (!response.ok) {
      res.value = { meals: null, error: `HTTP error! Status: ${response.status}` }
      return
    }
    const data: ApiResponse = await response.json()
    res.value = data
  } catch (error) {
    res.value = { meals: null, error: 'Could not fetch data.' }
    console.error('Error while fetching data:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="space-y-2">
    <h1 class="text-2xl font-bold">Search for recipes</h1>
    <form @submit.prevent="fetchRecipes" class="space-x-2">
      <input class="text-black" v-model="query" type="text" placeholder="Enter a dish" />
      <button>Search</button>
    </form>
    <div v-if="isLoading">Loading data...</div>
    <div v-if="hasError">{{ res?.error }}</div>
    <RecipeList v-else-if="meals.length" v-bind="{ favoritedMeals, meals }" />
    <p v-else>No recipes found.</p>
  </main>
</template>
