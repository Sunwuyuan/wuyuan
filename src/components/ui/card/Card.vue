<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-border/60 bg-card/85 text-card-foreground shadow-sm backdrop-blur-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
