<script setup lang="ts">
import FeaturedProductCard from "@/components/home/FeaturedProductCard.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import ProductsGrid from "@/components/home/ProductsGrid.vue";
import SocialBento from "@/components/home/SocialBento.vue";
import { homeContent } from "@/content/home";
import { useWindowScroll } from "@vueuse/core";
import { computed, ref } from "vue";

const { y } = useWindowScroll();
const bgLoaded = ref(false);

const bgStyle = computed(() => ({
  opacity: bgLoaded.value ? 1 - Math.min(Math.max(y.value / 600, 0), 1) : 0,
  transform: `scale(${1 + y.value * 0.0003})`,
  transition: 'opacity 0.8s ease',
}));
</script>

<template>
  <!-- Hero background image with scroll parallax -->
  <div class="fixed inset-0 z-[-1] overflow-hidden" :style="bgStyle">
    <img
      src="https://uapis.cn/api/v1/random/image?category=acg&type=pc"
      alt=""
      class="h-full w-full object-cover"
      @load="bgLoaded = true"
    />
    <div class="absolute inset-0 bg-black/30" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]"
    />
  </div>

  <!-- Full-page glow orbs (no clipping) -->
  <div class="page-glow" />
  <div class="page-glow-extra" />

  <div class="relative z-10 px-4 pb-16 pt-24 sm:px-6 sm:pt-32 lg:px-8">
    <main class="relative mx-auto flex w-full max-w-[1380px] flex-col gap-12">
      <HeroSection :profile="homeContent.profile" />
      <FeaturedProductCard :product="homeContent.featuredProduct" />
      <ProductsGrid :products="homeContent.products" />
      <SocialBento :social="homeContent.social" :contacts="homeContent.contacts" :organizations="homeContent.organizations" />
    </main>
  </div>
</template>
