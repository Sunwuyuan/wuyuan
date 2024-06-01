// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('mdui-')
    },
    
  },

  modules: ["@nuxtjs/tailwindcss"]
})