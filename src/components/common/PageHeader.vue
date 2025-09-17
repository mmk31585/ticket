<template>
  <div class="page-header">
    <div class="meta">
      <a-breadcrumb class="breadcrumb" separator="/">
        <a-breadcrumb-item v-for="item in breadcrumb" :key="item.label">
          <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
          <span v-else>{{ item.label }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="titles">
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * سرصفحهٔ قابل استفاده مجدد برای صفحات اصلی سامانه
 */
interface BreadcrumbItem {
  label: string
  to?: string
}

withDefaults(
  defineProps<{
    title: string
    description?: string
    breadcrumb?: BreadcrumbItem[]
  }>(),
  {
    breadcrumb: () => [],
  },
)
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.breadcrumb {
  font-size: 0.85rem;
  color: var(--text-color-muted);
}

.titles h1 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--text-color);
}

.titles p {
  margin: 4px 0 0;
  color: var(--text-color-muted);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    justify-content: flex-start;
  }
}
</style>
