<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:translate-y-px",
        outline:
          "border border-border bg-background/70 text-foreground hover:bg-muted/70 active:translate-y-px",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  as?: "button" | "a";
  class?: string;
  disabled?: boolean;
  href?: string;
  rel?: string;
  size?: ButtonVariants["size"];
  target?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariants["variant"];
};

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
  type: "button",
  variant: "default",
  size: "default",
});

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <component
    :is="props.as"
    :class="classes"
    :disabled="props.as === 'button' ? props.disabled : undefined"
    :href="props.as === 'a' ? props.href : undefined"
    :rel="props.as === 'a' ? props.rel : undefined"
    :target="props.as === 'a' ? props.target : undefined"
    :type="props.as === 'button' ? props.type : undefined"
  >
    <slot />
  </component>
</template>
