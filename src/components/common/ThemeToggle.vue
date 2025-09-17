<template>
  <div class="theme-toggle">
    <span class="label">{{ label }}</span>
    <a-switch
      :checked="mode === 'dark'"
      checked-children="تیره"
      un-checked-children="روشن"
      @change="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
const { t } = useI18n()

const mode = computed(() => themeStore.mode)
const label = computed(() => t('settings.theme'))

function toggle() {
  themeStore.toggle()
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 0.85rem;
  color: var(--text-color-muted);
}
</style>
