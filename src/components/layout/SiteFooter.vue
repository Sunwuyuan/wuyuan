<script setup>
import { computed, ref } from "vue";
import { Github, Globe, Mail, MoonStar } from "lucide-vue-next";

import { getCurrentTheme, toggleTheme } from "@/lib/theme";

const currentYear = computed(() => new Date().getFullYear());
const activeTheme = ref(getCurrentTheme());

function handleThemeToggle() {
  activeTheme.value = toggleTheme();
}
</script>

<template>
  <footer
    class="relative z-20 border-t border-slate-300/20 text-slate-100 [background:linear-gradient(110deg,rgba(15,23,42,0.96),rgba(17,24,39,0.9),rgba(15,23,42,0.96))]"
  >
    <div class="mx-auto w-full max-w-[1380px] px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <p class="text-lg font-medium text-slate-100/95">
            ©2020 - {{ currentYear }} By
            <span class="font-semibold text-white">孙悟元</span>
          </p>

        </div>

        <div class="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-slate-200/90">


          <button
            type="button"
            class="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
            :title="activeTheme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
            @click="handleThemeToggle"
          >
            <MoonStar class="h-3.5 w-3.5" />
            主题
          </button>



          <a
            href="https://status.wuyuan.dev/"
            target="_blank"
            rel="noreferrer"
            class="transition-colors duration-200 hover:text-white"
          >
            状态页
          </a>

          <div class="flex items-center gap-2 pl-1">
            <a
              href="https://github.com/SunWuyuan"
              target="_blank"
              rel="noreferrer"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-100/30 text-slate-200 transition-colors duration-200 hover:border-slate-100/60 hover:text-white"
            >
              <Github class="h-3.5 w-3.5" />
              <span class="sr-only">GitHub</span>
            </a>

            <a
              href="mailto:sun@wuyuan.dev"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-100/30 text-slate-200 transition-colors duration-200 hover:border-slate-100/60 hover:text-white"
            >
              <Mail class="h-3.5 w-3.5" />
              <span class="sr-only">邮箱</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
