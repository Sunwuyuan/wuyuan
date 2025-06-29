<template>
  <mdui-card variant="filled" class="zerocat-card"  target="_blank">
    <!-- Header Section -->
    <div class="card-header">
      <img
        src="@/assets/cslogo.svg"
        alt="ZeroCat Logo"
        class="zerocat-logo"
      />
      <div class="header-text">
        <h2 class="title">Classworks 作业板</h2>
        <p class="subtitle">适用于班级大屏的作业板小工具</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="card-content">
      <p class="description">
        Classworks 是一个适用于班级大屏的作业板小工具，在班级一体机上记录、显示与同步作业信息。
      </p>



      <!-- Action Buttons -->
      <div class="action-buttons">
        <mdui-button
          icon="public"
          href="https://cs.houlangs.com"
          target="_blank"
          style="margin-right: 8px"
        >访问网站</mdui-button>
        <mdui-button
          icon="code"
          href="https://github.com/ZeroCatDev/Classworks"
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
  margin: 1rem 0;
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
  margin: 1.5rem 0;
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