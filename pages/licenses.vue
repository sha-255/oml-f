<template>
  <v-container>
    <v-skeleton-loader
      class="mx-10 my-10"
      type="paragraph"
      :elevation="24"
      v-for="(_, idx) in [0, 1, 2, 3, 4]"
      :key="idx"
    ></v-skeleton-loader>
  </v-container>
</template>
