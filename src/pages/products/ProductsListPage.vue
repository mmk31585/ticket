<template>
  <div>
    <page-header
      :title="t('products.title')"
      :description="t('products.listDescription')"
      :breadcrumb="breadcrumb"
    >
      <template #actions>
        <a-button type="primary" @click="goToCreate">
          {{ t('navigation.productCreate') }}
        </a-button>
      </template>
    </page-header>

    <data-table
      ref="tableRef"
      :columns="columns"
      :fetcher="fetcher"
      :page-size="6"
    >
      <template #filters="{ apply }">
        <a-select
          v-model:value="statusFilter"
          style="width: 160px"
          :placeholder="t('products.status')"
          @change="applyStatus(apply)"
        >
          <a-select-option value="all">همه وضعیت‌ها</a-select-option>
          <a-select-option value="active">{{ t('products.statusActive') }}</a-select-option>
          <a-select-option value="draft">{{ t('products.statusDraft') }}</a-select-option>
        </a-select>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'price'">
          {{ currencyFormatter.format(record.price) }}
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 'active' ? 'green' : 'gold'">
            {{ record.status === 'active' ? t('products.statusActive') : t('products.statusDraft') }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'createdAt'">
          {{ formatDate(record.createdAt) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" @click="viewProduct(record.id)">{{ t('actions.view') }}</a-button>
            <a-button type="link" @click="editProduct(record.id)">{{ t('actions.edit') }}</a-button>
            <a-popconfirm :title="'آیا از حذف مطمئن هستید؟'" @confirm="removeProduct(record.id)">
              <a-button type="link" danger>{{ t('actions.delete') }}</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import DataTable from '@/components/common/DataTable.vue'
import useJalaliDate from '@/composables/useJalaliDate'
import type { Product } from '@/types/product'
import { deleteProduct, fetchProducts } from '@/mocks/api'

const router = useRouter()
const { t } = useI18n()
const { formatDate } = useJalaliDate()

const breadcrumb = computed(() => [
  { label: t('navigation.dashboard'), to: '/' },
  { label: t('products.title') },
])

const statusFilter = ref<'all' | 'active' | 'draft'>('all')
const tableRef = ref<InstanceType<typeof DataTable> | null>(null)

const columns = computed<TableColumnsType<Product>>(() => [
  {
    title: t('products.name'),
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: t('products.sku'),
    dataIndex: 'sku',
    sorter: true,
  },
  {
    title: t('products.price'),
    dataIndex: 'price',
    sorter: true,
  },
  {
    title: t('products.stock'),
    dataIndex: 'stock',
    sorter: true,
  },
  {
    title: t('products.status'),
    dataIndex: 'status',
  },
  {
    title: t('products.detail.createdAt'),
    dataIndex: 'createdAt',
    sorter: true,
  },
  {
    title: t('table.actions'),
    key: 'actions',
  },
])

const currencyFormatter = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR',
  maximumFractionDigits: 0,
})

async function fetcher(params: Record<string, unknown>) {
  const response = await fetchProducts({
    ...params,
    status: statusFilter.value,
  })
  return response
}

function goToCreate() {
  router.push({ name: 'products-create' })
}

function viewProduct(id: string) {
  router.push({ name: 'products-detail', params: { id } })
}

function editProduct(id: string) {
  router.push({ name: 'products-edit', params: { id } })
}

function applyStatus(apply: (params: Record<string, unknown>) => void) {
  apply({ status: statusFilter.value })
}

async function removeProduct(id: string) {
  await deleteProduct(id)
  message.success(t('products.successDelete'))
  tableRef.value?.refresh()
}
</script>

<style scoped>
:deep(.ant-table) {
  direction: rtl;
}
</style>
