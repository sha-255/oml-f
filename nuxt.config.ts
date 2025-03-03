export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "vuetify-nuxt-module",
    "@pinia/nuxt"
  ],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark'
      }
    }
  },
  compatibilityDate: "2025-03-03"
})