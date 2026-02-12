<script setup lang="ts">
import FeaturedProductCard from "@/components/home/FeaturedProductCard.vue";
import ContactCards from "@/components/home/ContactCards.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import ProductsGrid from "@/components/home/ProductsGrid.vue";
import ReadmeCard from "@/components/home/ReadmeCard.vue";
import SocialBento from "@/components/home/SocialBento.vue";
import TwitterPostsTimeline from "@/components/home/TwitterPostsTimeline.vue";
import { homeContent } from "@/content/home";
import { useWindowScroll } from "@vueuse/core";
import { computed, ref, onMounted } from "vue";

const { y } = useWindowScroll();
const bgLoaded = ref(false);

const bgStyle = computed(() => ({
  opacity: bgLoaded.value ? 1 - Math.min(Math.max(y.value / 600, 0), 1) : 0,
  transform: `scale(${1 + y.value * 0.0003})`,
  transition: 'opacity 0.8s ease',
}));

const discourseUsername = "eviltrout";
const discourseUrl = "https://kernyr.wuyuan.dev/";

declare global {
  interface Window {
    DiscourseEmbed?: {
      discourseUrl: string;
      discourseEmbedUrl: string;
      className?: string;
    };
  }
}

onMounted(() => {
  let usernameMeta = document.querySelector("meta[name='discourse-username']") as HTMLMetaElement | null;

  if (!usernameMeta) {
    usernameMeta = document.createElement("meta");
    usernameMeta.name = "discourse-username";
    usernameMeta.content = discourseUsername;
    document.head.appendChild(usernameMeta);
  }

  window.DiscourseEmbed = {
    discourseUrl,
    discourseEmbedUrl: window.location.href,
  };

  const scriptSrc = `${discourseUrl}javascripts/embed.js`;
  const existingScript = document.querySelector(`script[src=\"${scriptSrc}\"]`);
  if (!existingScript) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = scriptSrc;
    document.head.appendChild(script);
  }

});
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
      <ReadmeCard />
      <ContactCards :contacts="homeContent.contacts" />
      <SocialBento :organizations="homeContent.organizations" />
      <div id="discourse-comments" class="" />
      <TwitterPostsTimeline :user-id="1" :limit="20" :include-replies="false" />
    </main>
  </div>
</template>
