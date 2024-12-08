<script setup lang="ts">
import type { Meal } from '@/views/HomeView.vue'
import starEmpty from '@/assets/star-empty.svg'
import starGold from '@/assets/star-gold.svg'

const { favoritedMeals } = defineProps<{
  meals: Meal[]
  favoritedMeals: Meal[]
}>()

const toggleFavorite = (meal: Meal) => {
  const index = favoritedMeals.findIndex((m) => m.idMeal === meal.idMeal)
  if (index === -1) {
    favoritedMeals.push(meal)
  } else {
    favoritedMeals.splice(index, 1)
  }
  localStorage.setItem('favoritedMeals', JSON.stringify(favoritedMeals))
}
</script>

<template>
  <ul class="space-y-2">
    <li v-for="(meal, index) in meals" :key="index" class="flex items-center gap-2">
      <!-- if meal is favorited show gold star otherwise show empty star -->
      <img
        :src="favoritedMeals.some((m) => m.idMeal === meal.idMeal) ? starGold : starEmpty"
        alt="Favorite"
        @click="toggleFavorite(meal)"
        class="w-4 h-4 cursor-pointer"
      />
      <router-link :to="`/recipe/${meal.idMeal}`">{{ meal.strMeal }}</router-link>
    </li>
  </ul>
</template>
