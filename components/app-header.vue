<template>
  <v-app-bar name="app-bar">
    <h1 class="mx-auto">OLM</h1>

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
import { useTheme } from "vuetify";

const vuetifyTheme = useTheme();
const theme = ref("dark");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  vuetifyTheme.global.name.value = theme.value;
};
</script>
