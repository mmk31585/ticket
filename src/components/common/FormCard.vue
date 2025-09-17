<template>
  <a-card :title="title" :bordered="false" class="form-card">
    <p v-if="description" class="description">{{ description }}</p>
    <slot />
  </a-card>
</template>

<script setup lang="ts">
/**
 * کارت فرم برای هماهنگی ظاهری فرم‌های سامانه
 */
withDefaults(
  defineProps<{
    title: string
    description?: string
  }>(),
  {
    description: '',
  },
)
</script>

<style scoped>
.form-card {
  border-radius: var(--card-radius);
  box-shadow: var(--ant-card-box-shadow, 0 16px 30px rgba(15, 23, 42, 0.08));
}

.description {
  margin-top: -4px;
  margin-bottom: 24px;
  color: var(--text-color-muted);
}
</style>
