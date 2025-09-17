<template>
  <a-config-provider :direction="'rtl'" :theme="themeConfig" :locale="antLocale">
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import faIR from 'ant-design-vue/es/locale/fa_IR'
import { useThemeStore } from '@/stores/modules/theme'
import { lightTheme, darkTheme } from '@/theme/tokens'

const themeStore = useThemeStore()

const antLocale = faIR

const themeConfig = computed(() => (themeStore.mode === 'dark' ? darkTheme : lightTheme))

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', themeStore.mode)
})
</script>

<style scoped>
:global(body) {
  background-color: var(--layout-bg);
}
</style>
