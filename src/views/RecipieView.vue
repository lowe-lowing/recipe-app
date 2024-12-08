<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Meal } from '@/views/HomeView.vue'

const recipe = ref<Meal | null>(null)

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    if (!response.ok) {
      recipe.value = {
        idMeal: '',
        strMeal: 'Error',
        strMealThumb: '',
        strInstructions: 'HTTP error!',
      }
      return
    }
    const data = await response.json()
    recipe.value = data.meals[0]
  } catch (error) {
    recipe.value = {
      idMeal: '',
      strMeal: 'Error',
      strMealThumb: '',
      strInstructions: 'Failed to fetch data',
    }
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div v-if="recipe" class="space-y-3">
    <h1>{{ recipe.strMeal }}</h1>
    <img :src="recipe.strMealThumb" alt="Meal Image" />
    <p>{{ recipe.strInstructions }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
