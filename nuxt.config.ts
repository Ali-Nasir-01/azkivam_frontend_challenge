// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: ['@nuxt/image'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    // Options
  },
  runtimeConfig: {
    public: {
      prefix: process.env.PREFIX
    }
  },
  vite: {
    server: {
    proxy: {
      '/api/v1': {
        target: process.env.API_BASE_URL,
        changeOrigin: true
      }
    }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    }
  }
})
