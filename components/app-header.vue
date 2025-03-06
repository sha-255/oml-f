<template>
  <v-app-bar name="app-bar">
    <h1 class="mx-auto">OML</h1>

    <v-btn
      :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      text="Theme"
      slim
      @click="toggleTheme"
    ></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
const theme = ref("dark");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>
