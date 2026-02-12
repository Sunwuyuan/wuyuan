<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import Typewriter from "typewriter-effect/dist/core";
import AppIcon from "@/components/home/AppIcon.vue";
import type { Profile } from "@/types/home";

const props = defineProps<{
  profile: Profile;
}>();

const mottoEl = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mottoEl.value) {
    new Typewriter(mottoEl.value, {
      delay: 60,
      cursor: "|",
    })
      .typeString(props.profile.motto)
      .start();
  }
});
</script>

<template>
  <section class="hero-section relative pb-8 pt-4">
    <div class="relative flex flex-col gap-6">
      <!-- Avatar -->
      <div class="avatar-enter w-fit">
        <img
          :src="profile.avatar"
          alt="Avatar"
          class="h-20 w-20 rounded-full drop-shadow-lg sm:h-24 sm:w-24"
        />
      </div>

      <!-- Name -->
      <h1 class="hero-title text-4xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
          style="font-family: 'Noto Serif SC', serif;">
        {{ profile.name }}
      </h1>

      <!-- Motto (typewriter) -->
      <div
        ref="mottoEl"
        class="hero-subtitle max-w-2xl text-xl font-medium text-white/90 drop-shadow-md sm:text-2xl lg:text-3xl"
        style="font-family: 'Noto Serif SC', serif;"
      />

      <!-- Quick links -->
      <div class="hero-links flex flex-wrap gap-2.5">
        <a
          v-for="link in profile.quickLinks"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
          class="hero-btn bento-card group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/20 active:scale-100"
          style="font-family: 'Noto Serif SC', serif;"
        >
          <AppIcon
            :name="link.icon"
            class="h-4 w-4 text-white/60 transition-colors duration-200 group-hover:text-white"
          />
          <span class="transition-colors duration-200 group-hover:text-white">{{ link.label }}</span>
          <ArrowUpRight
            class="h-3.5 w-3.5 -ml-0.5 max-w-0 overflow-hidden text-white/60 opacity-0 transition-all duration-200 group-hover:max-w-[1rem] group-hover:opacity-100"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  animation: hero-enter 500ms ease-out both;
}

.avatar-enter {
  animation: hero-enter 400ms ease-out both;
}

.hero-title {
  animation: hero-enter 500ms ease-out 80ms both;
}

.hero-subtitle {
  animation: hero-enter 500ms ease-out 160ms both;
}

.hero-links {
  animation: hero-enter 500ms ease-out 240ms both;
}

.hero-btn {
  animation: hero-enter 400ms ease-out both;
}

.hero-btn:nth-child(1) { animation-delay: 280ms; }
.hero-btn:nth-child(2) { animation-delay: 330ms; }
.hero-btn:nth-child(3) { animation-delay: 380ms; }
.hero-btn:nth-child(4) { animation-delay: 430ms; }

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typewriter cursor style */
.hero-subtitle :deep(.Typewriter__cursor) {
  color: hsl(var(--accent));
  font-weight: 300;
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
