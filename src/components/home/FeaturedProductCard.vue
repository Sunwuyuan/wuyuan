<script setup lang="ts">
import { ArrowUpRight, Github } from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/home";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <a
    :href="product.href"
    target="_blank"
    rel="noreferrer"
    class="section-reveal bento-card group block overflow-hidden rounded-2xl border border-border/60 bg-card/85 shadow-sm backdrop-blur-sm transition-colors hover:bg-card/95"
  >
    <div class="relative aspect-[16/7] w-full overflow-hidden bg-muted">
      <img
        v-if="product.cover"
        :src="product.cover"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      <div class="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 sm:p-8">
        <div class="flex items-end gap-4">
          <img
            :src="product.logo"
            :alt="`${product.name} logo`"
            class="h-14 w-14 rounded-2xl border border-border/40 bg-card/90 p-2 shadow-lg sm:h-16 sm:w-16"
          />
          <div class="min-w-0">
            <h2 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {{ product.name }}
            </h2>
            <p class="mt-1 text-base text-muted-foreground sm:text-lg">
              {{ product.slogan }}
            </p>
          </div>
        </div>
        <ArrowUpRight
          class="hidden h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-2">
        <Badge
          v-for="tag in product.tags"
          :key="tag"
          variant="secondary"
          class="rounded-full"
        >
          {{ tag }}
        </Badge>
      </div>

      <span v-if="product.description" class="text-sm text-muted-foreground">
        {{ product.description }}
      </span>

      <span
        v-if="product.repo"
        class="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Github class="h-3.5 w-3.5" />
        开源
      </span>
    </div>
  </a>
</template>
