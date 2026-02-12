<script setup lang="ts">
import { Bookmark, ExternalLink, Heart, MessageCircle, Repeat2 } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

interface PostAuthor {
  id: number;
  username: string;
  display_name?: string;
  avatar?: string | null;
}

interface PostStats {
  replies?: number;
  retweets?: number;
  likes?: number;
  bookmarks?: number;
}

interface PostMedia {
  id: number;
  url: string;
  mime_type?: string;
  order?: number;
}

interface PostEmbed {
  type?: string;
  url?: string;
}

interface ViewerContext {
  liked?: boolean;
  bookmarked?: boolean;
  retweeted?: boolean;
}

interface PostItem {
  id: number;
  type?: string;
  content?: string;
  created_at: string;
  is_deleted?: boolean;
  author: PostAuthor;
  stats?: PostStats;
  quote_of_id?: number | null;
  media?: PostMedia[];
  embed?: PostEmbed | null;
  viewer_context?: ViewerContext;
}

interface PostsResponse {
  status: "success" | "error";
  message?: string;
  data?: {
    posts?: PostItem[];
    includes?: {
      posts?: Record<string, PostItem>;
    };
    next_cursor?: string | number | null;
    has_more?: boolean;
  };
}

const props = withDefaults(
  defineProps<{
    userId?: number;
    limit?: number;
    includeReplies?: boolean;
    authToken?: string;
  }>(),
  {
    userId: 1,
    limit: 20,
    includeReplies: false,
    authToken: "",
  },
);

const API_BASE = "https://api.zcservice.houlang.cloud";
const ASSET_CDN_BASE = "https://zerocat-bitiful.houlangs.com";
const POST_LINK_BASE = "https://zerocat.dev/app/posts";
const HEX_HASH_RE = /^[a-f0-9]{32}$/i;
const FILE_EXT_RE = /\.[a-z0-9]{2,5}$/i;

const posts = ref<PostItem[]>([]);
const quotePostMap = ref<Record<string, PostItem>>({});
const brokenAvatarUserIds = ref<Set<string>>(new Set());
const avatarCandidateIndexMap = ref<Record<string, number>>({});
const cursor = ref<string | number | undefined>(undefined);
const hasMore = ref(true);
const loading = ref(false);
const loadingMore = ref(false);
const errorMessage = ref("");

let requestId = 0;

const userTag = computed(() => {
  const firstAuthor = posts.value[0]?.author;
  return firstAuthor?.username ? `@${firstAuthor.username}` : `用户 ${props.userId}`;
});

const formatCount = (value?: number) => {
  const count = value ?? 0;
  if (count >= 10000) {
    const w = count / 10000;
    return `${w >= 10 ? w.toFixed(0) : w.toFixed(1)}万`;
  }
  return String(count);
};

const formatShortTime = (isoTime?: string) => {
  if (!isoTime) return "";
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const sec = Math.floor(diffMs / 1000);

  if (sec < 60) return `${Math.max(sec, 1)}秒`;
  if (sec < 3600) return `${Math.floor(sec / 60)}分`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}时`;
  if (sec < 604800) return `${Math.floor(sec / 86400)}天`;

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const formatFullTime = (isoTime?: string) => {
  if (!isoTime) return "";
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const normalizeAssetUrl = (rawUrl?: string | null) => {
  if (!rawUrl) return "";
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
  const normalized = rawUrl.replace(/^\/+/, "");
  const withAssetsPrefix = normalized.startsWith("assets/")
    ? normalized
    : `assets/${normalized}`;
  return `${ASSET_CDN_BASE}/${withAssetsPrefix}`;
};

const appendWebpIfMissing = (path: string) => {
  const trimmed = path.trim();
  if (!trimmed) return trimmed;

  const [base, query = ""] = trimmed.split("?");
  const hasExt = FILE_EXT_RE.test(base.split("/").pop() ?? "");
  const withExt = hasExt ? base : `${base}.webp`;
  return query ? `${withExt}?${query}` : withExt;
};

const buildAvatarAssetPath = (rawAvatar: string) => {
  const normalized = rawAvatar.replace(/^\/+/, "").trim();
  if (!normalized) return "";

  if (normalized.startsWith("assets/")) {
    return appendWebpIfMissing(normalized);
  }

  const [base, query = ""] = normalized.split("?");
  const plainBase = base.replace(/^assets\//, "");
  const hashWithoutExt = plainBase.replace(FILE_EXT_RE, "");

  if (HEX_HASH_RE.test(hashWithoutExt)) {
    const hashWithExt = `${hashWithoutExt}.webp`;
    const path = `assets/${hashWithoutExt.slice(0, 2)}/${hashWithoutExt.slice(2, 4)}/${hashWithExt}`;
    return query ? `${path}?${query}` : path;
  }

  if (plainBase.includes("/")) {
    const path = `assets/${appendWebpIfMissing(plainBase)}`;
    return query ? `${path}?${query}` : path;
  }

  const filename = appendWebpIfMissing(plainBase);
  return `assets/${filename}`;
};

const buildAvatarCandidates = (rawAvatar?: string | null) => {
  const avatar = (rawAvatar ?? "").trim();
  if (!avatar) return [];

  if (/^https?:\/\//i.test(avatar)) {
    const asHttps = avatar.replace(/^http:\/\//i, "https://");
    return Array.from(new Set([avatar, asHttps]));
  }

  const normalized = avatar.replace(/^\/+/, "");
  const avatarAssetPath = buildAvatarAssetPath(avatar);
  const withAssetsPrefix = normalized.startsWith("assets/") ? normalized : `assets/${normalized}`;
  const candidates = [
    avatarAssetPath ? `${ASSET_CDN_BASE}/${avatarAssetPath}` : "",
    `${ASSET_CDN_BASE}/${withAssetsPrefix}`,
    `${API_BASE}/${normalized}`,
    avatarAssetPath ? `${API_BASE}/${avatarAssetPath}` : "",
    `${API_BASE}/${withAssetsPrefix}`,
    `${ASSET_CDN_BASE}/${normalized}`,
  ];

  return Array.from(new Set(candidates.filter(Boolean)));
};

const avatarKey = (author: PostAuthor) => String(author.id);

const resolveAvatarUrl = (author: PostAuthor) => {
  const key = avatarKey(author);
  if (brokenAvatarUserIds.value.has(key)) return "";

  const candidates = buildAvatarCandidates(author.avatar);
  if (!candidates.length) return "";

  const index = avatarCandidateIndexMap.value[key] ?? 0;
  return candidates[index] ?? "";
};

const markAvatarBroken = (author: PostAuthor) => {
  const key = avatarKey(author);
  const candidates = buildAvatarCandidates(author.avatar);
  const currentIndex = avatarCandidateIndexMap.value[key] ?? 0;
  const nextIndex = currentIndex + 1;

  if (nextIndex < candidates.length) {
    avatarCandidateIndexMap.value = {
      ...avatarCandidateIndexMap.value,
      [key]: nextIndex,
    };
    return;
  }

  const nextSet = new Set(brokenAvatarUserIds.value);
  nextSet.add(key);
  brokenAvatarUserIds.value = nextSet;
};

const authorInitial = (author: PostAuthor) => {
  const source = author.display_name || author.username || "";
  return source.slice(0, 1).toUpperCase() || "U";
};

const postLink = (postId: number) => `${POST_LINK_BASE}/${postId}`;

const openPost = (postId: number) => {
  window.location.href = postLink(postId);
};

const simplifyUrl = (rawUrl?: string) => {
  if (!rawUrl) return "";
  try {
    const url = new URL(rawUrl);
    const path = url.pathname === "/" ? "" : url.pathname;
    return `${url.hostname}${path}`;
  } catch {
    return rawUrl;
  }
};

const mediaSlotClass = (total: number, index: number) => {
  const count = Math.min(total, 4);
  if (count !== 3) return "";
  if (index === 0) return "slot-left";
  if (index === 1) return "slot-top-right";
  return "slot-bottom-right";
};

const normalizePosts = (source: PostItem[] = []) =>
  source
    .filter((post) => post && !post.is_deleted)
    .map((post) => ({
      ...post,
      media: [...(post.media ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    }));

const sortByIdDesc = (source: PostItem[]) =>
  [...source].sort((a, b) => Number(b.id) - Number(a.id));

const mergePosts = (oldPosts: PostItem[], incomingPosts: PostItem[]) => {
  const mergedMap = new Map<number, PostItem>();
  oldPosts.forEach((post) => mergedMap.set(post.id, post));
  incomingPosts.forEach((post) => mergedMap.set(post.id, post));
  return sortByIdDesc(Array.from(mergedMap.values()));
};

const getQuotedPost = (post: PostItem) => {
  if (post.quote_of_id == null) return null;
  return quotePostMap.value[String(post.quote_of_id)] ?? null;
};

const requestPosts = async (reset = false) => {
  if (reset) {
    if (loading.value) return;
    loading.value = true;
    loadingMore.value = false;
    errorMessage.value = "";
    posts.value = [];
    quotePostMap.value = {};
    brokenAvatarUserIds.value = new Set();
    avatarCandidateIndexMap.value = {};
    cursor.value = undefined;
    hasMore.value = true;
  } else {
    if (loading.value || loadingMore.value || !hasMore.value) return;
    loadingMore.value = true;
    errorMessage.value = "";
  }

  const currentRequestId = ++requestId;

  try {
    const url = new URL(`${API_BASE}/posts/user/${props.userId}`);
    url.searchParams.set("limit", String(props.limit));
    url.searchParams.set("include_replies", String(Boolean(props.includeReplies)));
    if (!reset && cursor.value != null) {
      url.searchParams.set("cursor", String(cursor.value));
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (props.authToken) {
      headers.Authorization = `Bearer ${props.authToken}`;
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`请求失败 (${response.status})`);
    }

    const payload = (await response.json()) as PostsResponse;
    if (payload.status === "error") {
      throw new Error(payload.message || "获取帖子失败");
    }

    const incomingPosts = normalizePosts(payload.data?.posts ?? []);
    const incomingQuoteMap: Record<string, PostItem> = {};
    const includePosts = payload.data?.includes?.posts ?? {};
    Object.keys(includePosts).forEach((key) => {
      const quoted = includePosts[key];
      if (quoted && !quoted.is_deleted) {
        incomingQuoteMap[key] = quoted;
      }
    });

    if (currentRequestId !== requestId) return;

    quotePostMap.value = {
      ...quotePostMap.value,
      ...incomingQuoteMap,
    };

    posts.value = reset ? sortByIdDesc(incomingPosts) : mergePosts(posts.value, incomingPosts);
    cursor.value = payload.data?.next_cursor ?? undefined;
    hasMore.value = Boolean(payload.data?.has_more);
  } catch (error) {
    if (currentRequestId !== requestId) return;
    errorMessage.value = error instanceof Error ? error.message : "获取帖子失败";
    hasMore.value = false;
  } finally {
    if (currentRequestId !== requestId) return;
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadMore = () => {
  requestPosts(false);
};

watch(
  () => [props.userId, props.limit, props.includeReplies, props.authToken],
  () => {
    requestPosts(true);
  },
  { immediate: true },
);
</script>

<template>
  <section class="section-reveal">
    <div class="bento-card twitter-card overflow-hidden rounded-2xl">
      <header class="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
        <div class="min-w-0">
          <h2 class="text-base font-semibold text-foreground sm:text-lg">Post Timeline</h2>
          <p class="truncate text-xs text-muted-foreground">{{ userTag }}</p>
        </div>
      </header>

      <div v-if="loading" class="space-y-4 px-4 py-4 sm:px-5">
        <div
          v-for="index in 4"
          :key="`skeleton-${index}`"
          class="animate-pulse rounded-xl border border-border/60 bg-muted/45 p-3"
        >
          <div class="mb-3 flex items-center gap-3">
            <div class="h-11 w-11 rounded-full bg-muted" />
            <div class="space-y-2">
              <div class="h-3 w-24 rounded bg-muted" />
              <div class="h-3 w-18 rounded bg-muted" />
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-3 w-full rounded bg-muted" />
            <div class="h-3 w-4/5 rounded bg-muted" />
          </div>
        </div>
      </div>

      <div v-else-if="errorMessage" class="px-4 py-6 text-center sm:px-5">
        <p class="text-sm text-destructive">{{ errorMessage }}</p>
        <button
          type="button"
          class="mt-3 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
          @click="requestPosts(true)"
        >
          重试
        </button>
      </div>

      <div v-else-if="posts.length === 0" class="px-4 py-7 text-center text-sm text-muted-foreground sm:px-5">
        暂无帖子
      </div>

      <ul v-else class="divide-y divide-border/65">
        <li
          v-for="post in posts"
          :key="post.id"
          class="tweet-item flex cursor-pointer gap-3 px-4 py-3 transition sm:px-5"
          role="link"
          tabindex="0"
          @click="openPost(post.id)"
          @keydown.enter.prevent="openPost(post.id)"
          @keydown.space.prevent="openPost(post.id)"
        >
          <div class="h-11 w-11 shrink-0">
            <img
              v-if="resolveAvatarUrl(post.author)"
              :src="resolveAvatarUrl(post.author)"
              :alt="post.author.display_name || post.author.username"
              class="h-full w-full rounded-full object-cover"
              loading="lazy"
              @error="markAvatarBroken(post.author)"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground"
            >
              {{ authorInitial(post.author) }}
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex min-w-0 items-center gap-1.5 text-sm">
              <span class="truncate font-semibold text-foreground">
                {{ post.author.display_name || post.author.username }}
              </span>
              <span class="truncate text-muted-foreground">@{{ post.author.username }}</span>
              <span class="text-muted-foreground">·</span>
              <time class="shrink-0 text-muted-foreground" :title="formatFullTime(post.created_at)">
                {{ formatShortTime(post.created_at) }}
              </time>
            </div>

            <p
              v-if="post.content"
              class="mt-1 whitespace-pre-wrap break-words text-[15px] leading-6 text-foreground"
            >
              {{ post.content }}
            </p>

            <div
              v-if="post.media?.length"
              class="tweet-media-grid mt-2"
              :class="`count-${Math.min(post.media.length, 4)}`"
            >
              <div
                v-for="(media, index) in post.media.slice(0, 4)"
                :key="media.id"
                class="media-slot"
                :class="mediaSlotClass(post.media.length, index)"
              >
                <video
                  v-if="media.mime_type?.startsWith('video')"
                  :src="normalizeAssetUrl(media.url)"
                  controls
                  preload="metadata"
                  class="media-content media-video"
                />
                <img
                  v-else
                  :src="normalizeAssetUrl(media.url)"
                  alt=""
                  loading="lazy"
                  class="media-content media-image"
                />
              </div>
            </div>

            <article
              v-if="getQuotedPost(post)"
              class="mt-2 rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm"
            >
              <p class="truncate font-medium text-foreground">
                {{ getQuotedPost(post)?.author?.display_name || getQuotedPost(post)?.author?.username }}
                <span class="font-normal text-muted-foreground">
                  @{{ getQuotedPost(post)?.author?.username }}
                </span>
              </p>
              <p class="mt-1 line-clamp-3 whitespace-pre-wrap break-words text-muted-foreground">
                {{ getQuotedPost(post)?.content || "引用帖内容不可用" }}
              </p>
            </article>

            <a
              v-if="post.embed?.type === 'url' && post.embed.url"
              :href="post.embed.url"
              target="_blank"
              rel="noreferrer noopener"
              class="mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/45 hover:text-foreground"
              @click.stop
            >
              <ExternalLink class="h-3.5 w-3.5 shrink-0" />
              <span class="truncate">{{ simplifyUrl(post.embed.url) }}</span>
            </a>

            <div class="mt-2 flex max-w-[24rem] items-center justify-between text-xs text-muted-foreground">
              <span class="inline-flex items-center gap-1.5">
                <MessageCircle class="h-4 w-4" />
                {{ formatCount(post.stats?.replies) }}
              </span>
              <span
                class="inline-flex items-center gap-1.5"
                :class="post.viewer_context?.retweeted ? 'text-emerald-500' : ''"
              >
                <Repeat2 class="h-4 w-4" />
                {{ formatCount(post.stats?.retweets) }}
              </span>
              <span
                class="inline-flex items-center gap-1.5"
                :class="post.viewer_context?.liked ? 'text-rose-500' : ''"
              >
                <Heart class="h-4 w-4" />
                {{ formatCount(post.stats?.likes) }}
              </span>
              <span
                class="inline-flex items-center gap-1.5"
                :class="post.viewer_context?.bookmarked ? 'text-sky-500' : ''"
              >
                <Bookmark class="h-4 w-4" />
                {{ formatCount(post.stats?.bookmarks) }}
              </span>
            </div>
          </div>
        </li>
      </ul>

      <footer
        v-if="posts.length > 0"
        class="flex items-center justify-center border-t border-border/70 px-4 py-3 sm:px-5"
      >
        <button
          type="button"
          class="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary/45 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-55"
          :disabled="!hasMore || loadingMore"
          @click="loadMore"
        >
          {{ loadingMore ? "加载中..." : hasMore ? "加载更多" : "没有更多了" }}
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.twitter-card {
  background-image: linear-gradient(
    160deg,
    hsla(var(--card) / 0.95) 0%,
    hsla(var(--card) / 0.9) 100%
  );
}

.tweet-item:hover {
  background-color: hsla(var(--muted) / 0.48);
}

.tweet-item:focus-visible {
  outline: 2px solid hsla(var(--ring) / 0.65);
  outline-offset: -2px;
}

.tweet-media-grid {
  display: grid;
  gap: 0.45rem;
  align-items: stretch;
  justify-items: stretch;
}

.tweet-media-grid.count-1 {
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
}

.tweet-media-grid.count-1 .media-slot {
  width: 100%;
  border: none;
  background: transparent;
  overflow: visible;
}

.tweet-media-grid.count-1 .media-image {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: none;
  object-fit: contain;
  object-position: left top;
  border-radius: 0.8rem;
  border: 1px solid hsla(var(--border) / 0.75);
  background: hsl(var(--muted));
}

.tweet-media-grid.count-2,
.tweet-media-grid.count-4 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tweet-media-grid.count-3 {
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  grid-template-areas:
    "left top-right"
    "left bottom-right";
  grid-template-rows: repeat(2, minmax(0, clamp(7.2rem, 18vw, 9.8rem)));
}

.media-slot {
  min-width: 0;
  overflow: hidden;
  border-radius: 0.8rem;
  border: 1px solid hsla(var(--border) / 0.75);
  background: hsl(var(--muted));
}

.tweet-media-grid.count-3 > .media-slot.slot-left {
  grid-area: left;
}

.tweet-media-grid.count-3 > .media-slot.slot-top-right {
  grid-area: top-right;
}

.tweet-media-grid.count-3 > .media-slot.slot-bottom-right {
  grid-area: bottom-right;
}

.tweet-media-grid.count-2 .media-slot,
.tweet-media-grid.count-4 .media-slot {
  aspect-ratio: 16 / 10;
}

.media-content {
  display: block;
  width: 100%;
  height: 100%;
}

.tweet-media-grid.count-2 .media-content,
.tweet-media-grid.count-3 .media-content,
.tweet-media-grid.count-4 .media-content {
  object-fit: cover;
  object-position: center;
}

.media-video {
  background: #000;
}
</style>
