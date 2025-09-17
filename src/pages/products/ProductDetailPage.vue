<template>
  <div>
    <page-header
      :title="product?.name ?? t('products.detail.title')"
      :description="t('products.formHelp')"
      :breadcrumb="breadcrumb"
    >
      <template #actions>
        <a-button type="primary" @click="goToEdit">
          {{ t('actions.edit') }}
        </a-button>
        <a-button @click="goBack">{{ t('actions.back') }}</a-button>
      </template>
    </page-header>

    <a-row :gutter="16">
      <a-col :xs="24" :md="16">
        <a-card :title="t('products.detail.basicInfo')" :bordered="false" class="detail-card">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item :label="t('products.name')">
              {{ product?.name }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('products.sku')">
              {{ product?.sku }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('products.category')">
              {{ product?.category }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('products.description')">
              {{ product?.description }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card :title="t('products.detail.pricing')" :bordered="false" class="detail-card">
          <p><strong>{{ t('products.price') }}:</strong> {{ currencyFormatter.format(product?.price ?? 0) }}</p>
          <p><strong>{{ t('products.stock') }}:</strong> {{ product?.stock }}</p>
          <p>
            <strong>{{ t('products.status') }}:</strong>
            <a-tag :color="product?.status === 'active' ? 'green' : 'gold'">
              {{ product?.status === 'active' ? t('products.statusActive') : t('products.statusDraft') }}
            </a-tag>
          </p>
        </a-card>
        <a-card :title="t('products.detail.inventory')" :bordered="false" class="detail-card">
          <p>
            <strong>{{ t('products.detail.createdAt') }}:</strong>
            {{ product ? formatDate(product.createdAt) : '—' }}
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { fetchProductById } from '@/mocks/api'
import type { Product } from '@/types/product'
import useJalaliDate from '@/composables/useJalaliDate'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { formatDate } = useJalaliDate()

const product = ref<Product | null>(null)

const breadcrumb = computed(() => [
  { label: t('navigation.dashboard'), to: '/' },
  { label: t('products.title'), to: { name: 'products-list' } },
  { label: product.value?.name ?? t('products.detail.title') },
])

const currencyFormatter = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR',
  maximumFractionDigits: 0,
})

async function loadProduct() {
  try {
    product.value = await fetchProductById(route.params.id as string)
  } catch (error) {
    message.error((error as Error).message || t('notifications.error'))
    router.push({ name: 'products-list' })
  }
}

function goToEdit() {
  router.push({ name: 'products-edit', params: { id: route.params.id } })
}

function goBack() {
  router.back()
}

onMounted(loadProduct)
</script>

<style scoped>
.detail-card {
  border-radius: 18px;
  margin-bottom: 16px;
}

.detail-card :deep(.ant-descriptions-item-label) {
  width: 120px;
}
</style>
