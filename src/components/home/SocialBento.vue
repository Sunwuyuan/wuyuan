<script setup lang="ts">
import { usePreferredDark } from "@vueuse/core";
import { ArrowUpRight } from "lucide-vue-next";
import { computed } from "vue";

import AppIcon from "@/components/home/AppIcon.vue";
import BilibiliCard from "@/components/home/BilibiliCard.vue";
import GitHubReposCard from "@/components/home/GitHubReposCard.vue";
import OrganizationsCard from "@/components/home/OrganizationsCard.vue";
import ReadmeCard from "@/components/home/ReadmeCard.vue";
import YouTubeCard from "@/components/home/YouTubeCard.vue";
import type { ContactLink, Organization, SocialEmbed } from "@/types/home";

const props = defineProps<{
  social: SocialEmbed;
  contacts: ContactLink[];
  organizations: {
    current: Organization[];
    past: Organization[];
  };
}>();

const isDark = usePreferredDark();

const ghChartUrl = computed(() => {
  const color = isDark.value ? "2563eb" : "1d4ed8";
  return `https://ghchart.rshah.org/${color}/${props.social.github.username}`;
});
</script>

<template>
  <section class="section-reveal grid grid-cols-2 gap-4 sm:grid-cols-4">
    <!-- GitHub Contributions Chart (full width) -->
    <a
      :href="social.github.href"
      target="_blank"
      rel="noreferrer"
      class="bento-card group col-span-2 overflow-hidden rounded-2xl border border-border/60 bg-card/85 shadow-sm backdrop-blur-sm transition-colors hover:bg-card/95 sm:col-span-4"
    >
      <div class="p-5 sm:p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img
              :src="`https://github.com/${social.github.username}.png?size=40`"
              :alt="social.github.username"
              class="h-8 w-8 rounded-full ring-2 ring-border/40"
            />
            <div>
              <span class="text-sm font-semibold">{{ social.github.username }}</span>
              <p class="text-xs text-muted-foreground">贡献图</p>
            </div>
          </div>
          <ArrowUpRight
            class="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
        <img
          :src="ghChartUrl"
          :alt="`${social.github.username} GitHub contributions`"
          class="w-full"
        />
      </div>
    </a>

    <!-- README (full width) -->
    <ReadmeCard />

    <!-- GitHub Repos (full width) -->
    <GitHubReposCard :username="social.github.username" />

    <!-- Organizations (full width) -->
    <OrganizationsCard
      :current="organizations.current"
      :past="organizations.past"
    />

    <!-- YouTube + Bilibili -->
    <YouTubeCard
      v-if="social.youtube"
      :channel-name="social.youtube.channelName"
      :href="social.youtube.href"
    />
    <BilibiliCard
      v-if="social.bilibili"
      :username="social.bilibili.username"
      :href="social.bilibili.href"
    />

    <!-- Contact cards -->
    <a
      v-for="contact in contacts"
      :key="contact.href"
      :href="contact.href"
      target="_blank"
      rel="noreferrer"
      class="bento-card group flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-card/95 sm:p-5"
    >
      <div class="flex items-center justify-between">
        <AppIcon :name="contact.icon" class="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
        <ArrowUpRight
          class="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </div>
      <div class="min-w-0">
        <p class="text-sm font-semibold">{{ contact.label }}</p>
        <p v-if="contact.handle" class="mt-0.5 truncate text-xs text-muted-foreground">{{ contact.handle }}</p>
      </div>
    </a>
  </section>
</template>
