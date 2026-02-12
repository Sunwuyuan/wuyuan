import { ref, onMounted } from "vue";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  language: string | null;
}

export function useGitHubRepos(username: string) {
  const repos = ref<GitHubRepo[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=20&direction=desc`
      );
      const json: GitHubRepo[] = await res.json();
      repos.value = json
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  });

  return { repos, loading, error };
}
