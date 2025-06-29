import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
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
    Fonts({
      custom: {
        families: [
          {
            name: "Noto Serif SC",
            local: "Noto Serif SC",
            src: "/src/assets/fonts/NotoSerifSC-VariableFont_wght.ttf",
          },
          /*{
            name: "Times New Roman",
            local: "Times New Roman",
            src: "/src/assets/fonts/Times New Roman.ttf",
          },*/
          {
            name: "Material Icons",
            local: "Material Icons",
            src: "/src/assets/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNZ.ttf",
          }
        ],
        display: "swap",
        preload: true,
        injectTo: "head-prepend"
      }
    }),
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