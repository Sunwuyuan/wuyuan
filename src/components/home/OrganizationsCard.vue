<script setup lang="ts">
import { ArrowUpRight, Building2 } from "lucide-vue-next";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types/home";

const props = defineProps<{
  current: Organization[];
  past: Organization[];
  class?: string;
}>();
</script>

<template>
  <Card :class="cn('overflow-hidden rounded-xl', props.class)">
    <div class="flex h-full flex-col p-6 sm:p-7">


      <div class="mt-5 grid flex-1 gap-3">
        <component
          :is="org.href ? 'a' : 'div'"
          v-for="org in current"
          :key="org.name"
          :href="org.href"
          :target="org.href ? '_blank' : undefined"
          :rel="org.href ? 'noreferrer' : undefined"
          class="group/org flex min-h-0 flex-col rounded-lg border border-border/75 bg-background/75 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/45"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="text-lg font-bold leading-tight">{{ org.name }}</p>
            <ArrowUpRight
              v-if="org.href"
              class="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover/org:-translate-y-0.5 group-hover/org:translate-x-0.5 group-hover/org:opacity-100"
            />
          </div>
          <p class="mt-2 text-sm text-muted-foreground">{{ org.description }}</p>
          <p class="mt-auto pt-2 text-xs text-muted-foreground/70">{{ org.period }}</p>
        </component>
      </div>

      <p v-if="past.length > 0" class="mt-4 text-xs text-muted-foreground/75">
        过往组织 {{ past.length }} 个
      </p>
    </div>
  </Card>
</template>
