export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      endpoint: process.env.ENDPOINT
    }
  },
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