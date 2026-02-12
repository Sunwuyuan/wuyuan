<script setup lang="ts">
import { ArrowUpRight, Building2 } from "lucide-vue-next";
import type { Organization } from "@/types/home";

defineProps<{
  current: Organization[];
  past: Organization[];
}>();
</script>

<template>
  <div
    class="bento-card col-span-2 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm sm:col-span-4 sm:p-5"
  >
    <div class="mb-4 flex items-center gap-2.5">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        <Building2 class="h-4.5 w-4.5 text-foreground" />
      </div>
      <span class="text-sm font-semibold">组织</span>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <component
        :is="org.href ? 'a' : 'div'"
        v-for="org in current"
        :key="org.name"
        :href="org.href"
        :target="org.href ? '_blank' : undefined"
        :rel="org.href ? 'noreferrer' : undefined"
        class="group/org flex flex-col gap-1.5 rounded-xl border border-border/40 bg-background/50 p-3.5 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
      >
        <div class="flex items-start justify-between gap-2">
          <p class="text-sm font-semibold">{{ org.name }}</p>
          <ArrowUpRight
            v-if="org.href"
            class="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover/org:-translate-y-0.5 group-hover/org:translate-x-0.5 group-hover/org:opacity-100"
          />
        </div>
        <p class="text-xs text-muted-foreground">{{ org.description }}</p>
        <p class="mt-auto text-xs text-muted-foreground/60">{{ org.period }}</p>
      </component>
    </div>

    <template v-if="past.length > 0">
      <div class="mb-3 mt-5 flex items-center gap-2.5">
        <span class="text-xs font-medium text-muted-foreground">过去</span>
        <div class="h-px flex-1 bg-border/40" />
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <component
          :is="org.href ? 'a' : 'div'"
          v-for="org in past"
          :key="org.name"
          :href="org.href"
          :target="org.href ? '_blank' : undefined"
          :rel="org.href ? 'noreferrer' : undefined"
          class="group/org flex flex-col gap-1.5 rounded-xl border border-border/40 bg-background/50 p-3.5 opacity-60 transition-all duration-200 hover:border-border/60 hover:bg-muted/50 hover:opacity-100"
        >
          <div class="flex items-start justify-between gap-2">
            <p class="text-sm font-semibold">{{ org.name }}</p>
            <ArrowUpRight
              v-if="org.href"
              class="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/org:opacity-100"
            />
          </div>
          <p class="text-xs text-muted-foreground">{{ org.description }}</p>
          <p class="mt-auto text-xs text-muted-foreground/60">{{ org.period }}</p>
        </component>
      </div>
    </template>
  </div>
</template>
