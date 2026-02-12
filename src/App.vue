<script setup>
import SiteFooter from "@/components/layout/SiteFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1">
      <router-view />
    </div>
    <SiteFooter />
  </div>
</template>
