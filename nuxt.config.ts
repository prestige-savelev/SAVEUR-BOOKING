export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: false
  },
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'SAVEUR — Бронирование столика',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})