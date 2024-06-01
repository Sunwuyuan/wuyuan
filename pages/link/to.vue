<script setup lang="ts">
const route = useRoute()
import 'mdui/mdui.css';
import 'mdui';
</script>

<template>
  <mdui-button class="btn">点我</mdui-button>

  <h1>Hello from index.vue</h1>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
