<script setup lang="ts">
import { marked } from "marked";
import { ref, onMounted } from "vue";
import readmeRaw from "@/content/readme.md?raw";

const renderedHtml = ref("");

onMounted(() => {
  renderedHtml.value = marked.parse(readmeRaw) as string;
});
</script>

<template>
  <div
    class="bento-card col-span-2 overflow-hidden rounded-2xl border border-border/60 bg-card/85 shadow-sm backdrop-blur-sm sm:col-span-4"
  >
    <!-- Terminal-style header bar -->
    <div class="flex items-center gap-3 border-b border-border/40 px-5 py-3">
      <div class="flex items-center gap-1.5">
        <span class="h-3 w-3 rounded-full bg-red-400/80" />
        <span class="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span class="h-3 w-3 rounded-full bg-green-400/80" />
      </div>
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <svg viewBox="0 0 16 16" class="h-3.5 w-3.5 fill-current">
          <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.75 3.75 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
        </svg>
        <span class="font-mono">README.md</span>
      </div>
    </div>
    <div class="p-5 sm:p-6">
      <div class="readme-content text-sm leading-relaxed text-muted-foreground" v-html="renderedHtml" />
    </div>
  </div>
</template>

<style scoped>
.readme-content :deep(h1) {
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: hsl(var(--foreground));
}
.readme-content :deep(h2) {
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: hsl(var(--foreground));
}
.readme-content :deep(h3),
.readme-content :deep(h4) {
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 0.75em;
  margin-bottom: 0.4em;
  color: hsl(var(--foreground));
}
.readme-content :deep(p) {
  margin-bottom: 0.75em;
  line-height: 1.8;
}
.readme-content :deep(ul),
.readme-content :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}
.readme-content :deep(ul) {
  list-style-type: disc;
}
.readme-content :deep(ol) {
  list-style-type: decimal;
}
.readme-content :deep(li) {
  margin-bottom: 0.25em;
  line-height: 1.7;
}
.readme-content :deep(a) {
  color: hsl(var(--primary));
  text-decoration: none;
  border-bottom: 1px solid hsla(var(--primary) / 0.3);
  transition: border-color 0.2s;
}
.readme-content :deep(a:hover) {
  border-bottom-color: hsl(var(--primary));
}
.readme-content :deep(code) {
  background: hsl(var(--muted));
  padding: 0.15em 0.4em;
  border-radius: 0.25em;
  font-size: 0.88em;
  font-family: "SF Mono", "Fira Code", monospace;
}
.readme-content :deep(pre) {
  background: hsl(var(--muted));
  padding: 0.75em 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin-bottom: 0.75em;
}
.readme-content :deep(pre code) {
  background: none;
  padding: 0;
}
.readme-content :deep(blockquote) {
  border-left: 3px solid hsl(var(--primary));
  padding-left: 1em;
  margin-left: 0;
  margin-bottom: 0.75em;
  color: hsl(var(--muted-foreground));
}
.readme-content :deep(hr) {
  border: none;
  border-top: 1px solid hsl(var(--border));
  margin: 1.25em 0;
}
.readme-content :deep(img) {
  max-width: 100%;
  border-radius: 0.5em;
  margin: 0.5em 0;
}
.readme-content :deep(> *:first-child) {
  margin-top: 0;
}
.readme-content :deep(> *:last-child) {
  margin-bottom: 0;
}
</style>
