export default defineNuxtConfig({
  app: {
    baseURL: '/matthew-portfolio/',
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@/assets/css/tailwind.css',                                   
    'primeicons/primeicons.css',                        
  ],
  

})