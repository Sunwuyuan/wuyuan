<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

defineProps<{
  channelName: string;
  href: string;
}>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noreferrer"
    class="bento-card group flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm transition-colors hover:bg-card/95 sm:p-5"
  >
    <div class="flex items-center justify-between">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF0000]/10">
        <svg viewBox="0 0 24 24" class="h-5 w-5 fill-[#FF0000]">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </div>
      <ArrowUpRight
        class="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </div>
    <div class="min-w-0">
      <p class="text-sm font-semibold">YouTube</p>
      <p class="mt-0.5 truncate text-xs text-muted-foreground">{{ channelName }}</p>
    </div>
  </a>
</template>
