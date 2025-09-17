<template>
  <a-layout class="layout-shell">
    <a-layout-sider
      v-model:collapsed="isCollapsed"
      :collapsed-width="80"
      :breakpoint="'lg'"
      collapsible
      class="layout-sider"
    >
      <div class="brand">
        <span class="brand-mark">بازارچه</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :items="menuItems"
        mode="inline"
        class="navigation"
        @click="onMenuClick"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="header-content">
          <a-space align="center" :size="16">
            <a-button
              type="text"
              class="toggle"
              :aria-label="isCollapsed ? 'نمایش منو' : 'مخفی کردن منو'"
              @click="isCollapsed = !isCollapsed"
            >
              <span class="toggle-icon">{{ isCollapsed ? '☰' : '⮜' }}</span>
            </a-button>
            <theme-toggle />
          </a-space>
          <div class="header-actions">
            <a-space align="center" :size="12">
              <div class="user-meta">
                <strong>{{ authStore.user?.name }}</strong>
                <span>{{ authStore.user?.role }}</span>
              </div>
              <a-button type="primary" danger ghost @click="handleLogout">
                {{ t('navigation.logout') }}
              </a-button>
            </a-space>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <div class="page-container">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useAuthStore } from '@/stores/modules/auth'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()

const isCollapsed = ref(false)

const menuItems = computed(() => [
  {
    key: 'dashboard',
    label: `📊 ${t('navigation.dashboard')}`,
  },
  {
    key: 'products-list',
    label: `🛒 ${t('navigation.productList')}`,
  },
  {
    key: 'products-create',
    label: `➕ ${t('navigation.productCreate')}`,
  },
  {
    key: 'settings',
    label: `⚙️ ${t('navigation.settings')}`,
  },
  {
    key: 'about',
    label: `ℹ️ ${t('navigation.about')}`,
  },
])

const selectedKeys = ref<string[]>([])

watch(
  () => route.name,
  (name) => {
    if (!name) return
    if (String(name).startsWith('products')) {
      if (name === 'products-edit' || name === 'products-detail') {
        selectedKeys.value = ['products-list']
      } else {
        selectedKeys.value = [String(name)]
      }
    } else {
      selectedKeys.value = [String(name)]
    }
  },
  { immediate: true },
)

function onMenuClick({ key }: { key: string }) {
  router.push({ name: key })
}

async function handleLogout() {
  authStore.logout()
  message.success(t('auth.logout'))
  await router.push({ name: 'login' })
}
</script>

<style scoped>
.layout-shell {
  min-height: 100vh;
}

.layout-sider {
  background: linear-gradient(180deg, #1a57d6 0%, #153c9c 100%);
  color: #ffffff;
}

.layout-sider :deep(.ant-menu) {
  background: transparent;
  color: #f0f5ff;
}

.layout-sider :deep(.ant-menu-item-selected) {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  color: #ffffff;
}

.brand {
  padding: 16px 12px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.brand-mark {
  font-size: 1.15rem;
}

.layout-header {
  background: transparent;
  padding-inline: 24px;
  border-bottom: 1px solid var(--layout-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
}

.user-meta {
  display: flex;
  flex-direction: column;
  text-align: right;
  color: var(--text-color);
}

.user-meta span {
  font-size: 0.75rem;
  color: var(--text-color-muted);
}

.toggle-icon {
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.layout-content {
  margin: 0;
}

.page-container {
  padding: 24px;
  background: transparent;
}

@media (max-width: 768px) {
  .layout-header {
    padding-inline: 16px;
  }
  .page-container {
    padding: 16px;
  }
}
</style>
