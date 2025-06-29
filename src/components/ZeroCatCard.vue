<template>
  <mdui-card variant="filled" class="zerocat-card" target="_blank">
    <!-- Header Section -->
    <div class="card-header">
      <img
        src="@/assets/zerocatlogo.svg"
        alt="ZeroCat Logo"
        class="zerocat-logo"
      />
      <div class="header-text">
        <h2 class="title">ZeroCat 社区</h2>
        <p class="subtitle">新一代，开源，编程社区</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="card-content">
      <p class="description">
        ZeroCat是一个自由、开放的Scratch社区平台。我们致力于为创作者提供一个完全开源的创作环境，
        让每个人都能自由地分享作品、交流想法，共同推动编程教育的发展。
      </p>

      <!-- Features Grid -->
      <div class="features-grid">
        <div class="feature-item">
          <mdui-icon name="code"></mdui-icon>
          <span class="feature-label">完全开源</span>
          <span class="feature-desc">代码透明，社区共建</span>
        </div>
        <div class="feature-item">
          <mdui-icon name="public"></mdui-icon>
          <span class="feature-label">自由创作</span>
          <span class="feature-desc">无限制的创意空间</span>
        </div>
        <div class="feature-item">
          <mdui-icon name="extension"></mdui-icon>
          <span class="feature-label">可扩展</span>
          <span class="feature-desc">支持自定义扩展</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <mdui-button
          icon="public"
          href="https://zerocat.dev"
          target="_blank"
          style="margin-right: 8px"
        >访问社区</mdui-button>
        <mdui-button
          icon="code"
          href="https://github.com/ZeroCatDev/ZeroCat"
          target="_blank"
        >查看源码</mdui-button>
      </div>
    </div>
  </mdui-card>
</template>

<script>
export default {
  name: 'ZeroCatCard'
}
</script>

<style scoped>
.zerocat-card {
  width: 100%;
  padding: 1.5rem;
  margin-top: 1rem;
  transition: transform 0.3s ease;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.zerocat-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-right: 1rem;
}

.header-text {
  flex: 1;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--mdui-color-primary);
}

.subtitle {
  margin: 0.25rem 0 0;
  color: var(--mdui-color-text-secondary);
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  margin: 1rem 0;
  color: var(--mdui-color-text);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: var(--mdui-color-surface-container-low);
  border-radius: 12px;
}

.feature-item mdui-icon {
  font-size: 24px;
  color: var(--mdui-color-primary);
  margin-bottom: 0.5rem;
}

.feature-label {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--mdui-color-primary);
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--mdui-color-text-secondary);
  margin-top: 0.25rem;
}

.action-buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 1.5rem;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-buttons mdui-button {
    width: 100%;
    margin-right: 0 !important;
  }
}
</style>