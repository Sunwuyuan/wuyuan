<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/home";

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <section
    class="section-reveal grid gap-5"
    style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));"
  >
    <a
      v-for="product in products"
      :key="product.id"
      :href="product.href"
      target="_blank"
      rel="noreferrer"
      class="bento-card group overflow-hidden rounded-xl"
    >
      <div class="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <img
          v-if="product.cover"
          :src="product.cover"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div class="flex flex-col gap-3 p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 min-w-0">
            <img
              :src="product.logo"
              :alt="`${product.name} logo`"
              class="h-10 w-10 rounded-lg border border-border/40 bg-card/90 p-1.5"
            />
            <div class="min-w-0">
              <h3 class="truncate text-base font-semibold">{{ product.name }}</h3>
              <p class="truncate text-sm text-muted-foreground">{{ product.slogan }}</p>
            </div>
          </div>
          <ArrowUpRight
            class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="tag in product.tags"
            :key="tag"
            variant="secondary"
            class="rounded-full"
          >
            {{ tag }}
          </Badge>
        </div>
      </div>
    </a>
  </section>
</template>
