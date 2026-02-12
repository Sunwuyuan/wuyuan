<script setup lang="ts">
import { useGitHubRepos } from "@/composables/useGitHubRepos";
import { ArrowUpRight, Star, GitFork } from "lucide-vue-next";

const props = defineProps<{
  username: string;
}>();

const { repos, loading } = useGitHubRepos(props.username);

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Vue: "#41b883",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
};
</script>

<template>
  <div
    class="bento-card col-span-2 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm sm:col-span-4 sm:p-5"
  >
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current text-foreground">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </div>
        <span class="text-sm font-semibold">GitHub</span>
      </div>
      <a
        :href="`https://github.com/${username}?tab=repositories`"
        target="_blank"
        rel="noreferrer"
        class="group/link flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
      >
        查看全部
        <ArrowUpRight class="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-xl bg-muted" />
    </div>

    <!-- Repos grid -->
    <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="repo in repos"
        :key="repo.id"
        :href="repo.html_url"
        target="_blank"
        rel="noreferrer"
        class="group/repo flex flex-col gap-2 rounded-xl border border-border/40 bg-background/50 p-3.5 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
      >
        <div class="flex items-start justify-between gap-2">
          <p class="truncate text-sm font-semibold transition-colors group-hover/repo:text-primary">{{ repo.name }}</p>
          <ArrowUpRight class="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5 group-hover/repo:opacity-100" />
        </div>
        <p v-if="repo.description" class="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {{ repo.description }}
        </p>
        <div class="mt-auto flex items-center gap-3 pt-1">
          <span v-if="repo.language" class="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              class="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-border/30"
              :style="{ backgroundColor: langColors[repo.language] || '#888' }"
            />
            {{ repo.language }}
          </span>
          <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1 text-xs text-muted-foreground">
            <Star class="h-3 w-3" />
            {{ repo.stargazers_count }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
