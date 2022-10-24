export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },

  publicRuntimeConfig: {
    API_ENTRYPOINT: process.env.API_ENTRYPOINT
  }
})
