<script setup lang="ts">
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  CircleHelp,
  Code2,
  Github,
  Globe,
  GraduationCap,
  Mail,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  Tv,
  Users,
} from "lucide-vue-next";
import { computed, type Component } from "vue";

import type { IconName } from "@/types/home";

const props = defineProps<{
  class?: string;
  name: IconName;
}>();

const iconMap: Record<IconName, Component> = {
  "arrow-up-right": ArrowUpRight,
  "book-open": BookOpen,
  building: Building2,
  code: Code2,
  github: Github,
  globe: Globe,
  "graduation-cap": GraduationCap,
  mail: Mail,
  "message-circle": MessageCircle,
  rocket: Rocket,
  send: Send,
  sparkles: Sparkles,
  tv: Tv,
  users: Users,
};

const iconComponent = computed(() => iconMap[props.name] ?? CircleHelp);
</script>

<template>
  <component :is="iconComponent" :class="props.class" />
</template>
