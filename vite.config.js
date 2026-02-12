import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
<<<<<<< HEAD
import Layouts from "vite-plugin-vue-layouts";
=======
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
>>>>>>> bc0c507ac3db0703e6398866f00599e97d275bda
import Vue from '@vitejs/plugin-vue'

import VueRouter from "unplugin-vue-router/vite";

import Pages from 'vite-plugin-pages'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Vue(),
    Components(),
    AutoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'js'],
      exclude: ['**/components/*.vue']
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
})
