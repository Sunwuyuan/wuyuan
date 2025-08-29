<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import "mdui/mdui.css";
import "mdui";
import { setColorScheme } from "mdui/functions/setColorScheme.js";

setColorScheme("#3a8cd6");
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>