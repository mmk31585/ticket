<template>
  <div class="data-table">
    <div class="table-toolbar">
      <a-input-search
        v-model:value="search"
        :placeholder="searchPlaceholder"
        allow-clear
        @search="handleSearch"
      />
      <div class="toolbar-actions">
        <slot name="filters" :apply="applyFilter" />
        <slot name="actions" />
      </div>
    </div>
    <a-alert
      v-if="selectedRowKeys.length"
      type="info"
      show-icon
      :message="selectionMessage"
      class="selection-info"
    />
    <a-table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :pagination="paginationConfig"
      :row-selection="rowSelection"
      :row-key="rowKey"
      :scroll="{ x: true }"
      @change="handleTableChange"
    >
      <template #emptyText>
        <div class="empty-state">{{ emptyText }}</div>
      </template>
      <slot />
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { TableProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { Key } from 'ant-design-vue/es/_util/type'

interface FetchParams {
  page: number
  pageSize: number
  search?: string
  sortField?: string
  sortOrder?: 'ascend' | 'descend'
  [key: string]: unknown
}

interface FetchResult<T> {
  items: T[]
  total: number
}

const props = withDefaults(
  defineProps<{
    columns: TableProps['columns']
    fetcher: (params: FetchParams) => Promise<FetchResult<Record<string, unknown>>>
    rowKey?: string
    pageSize?: number
  }>(),
  {
    rowKey: 'id',
    pageSize: 5,
  },
)

const { t } = useI18n()

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(false)
const search = ref('')
const pagination = reactive({
  current: 1,
  pageSize: props.pageSize,
  total: 0,
})
const sorter = reactive({
  field: undefined as string | undefined,
  order: undefined as 'ascend' | 'descend' | undefined,
})

const extraFilters = reactive<Record<string, unknown>>({})

const selectedRowKeys = ref<Key[]>([])

const emptyText = computed(() => t('table.empty'))
const searchPlaceholder = computed(() => t('table.searchPlaceholder'))
const selectionMessage = computed(() =>
  t('table.selected', { count: selectedRowKeys.value.length }),
)

const paginationConfig = computed(() => ({
  current: pagination.current,
  pageSize: pagination.pageSize,
  total: pagination.total,
  showSizeChanger: true,
  locale: {
    items_per_page: t('table.rowsPerPage'),
  },
  showTotal: (total: number) => `مجموع ${total.toLocaleString('fa-IR')} مورد`,
}))

const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: Key[]) => {
    selectedRowKeys.value = keys
  },
}))

let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => search.value,
  () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(() => {
      pagination.current = 1
      fetchData()
    }, 350)
  },
)

watch(
  () => props.pageSize,
  (value) => {
    pagination.pageSize = value
  },
)

function handleSearch() {
  pagination.current = 1
  fetchData()
}

function handleTableChange(pag: TableProps['pagination'], filters: unknown, sorterParam: any) {
  pagination.current = Number(pag?.current ?? 1)
  pagination.pageSize = Number(pag?.pageSize ?? props.pageSize)
  sorter.field = sorterParam?.field
  sorter.order = sorterParam?.order
  fetchData()
}

function applyFilter(params: Record<string, unknown>) {
  Object.assign(extraFilters, params)
  pagination.current = 1
  fetchData()
}

const rowKey = computed(() => props.rowKey)

async function fetchData() {
  loading.value = true
  try {
    const response = await props.fetcher({
      page: pagination.current,
      pageSize: pagination.pageSize,
      search: search.value,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...extraFilters,
    })
    rows.value = response.items
    pagination.total = response.total
  } catch (error) {
    console.error('خطا در خواندن داده جدول', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

onBeforeUnmount(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})

defineExpose({
  refresh: fetchData,
  resetSelection: () => {
    selectedRowKeys.value = []
  },
})
</script>

<style scoped>
.data-table {
  background: var(--color-bg-container, #fff);
  border-radius: var(--card-radius);
  padding: 24px;
  box-shadow: var(--ant-card-box-shadow, 0 16px 30px rgba(15, 23, 42, 0.08));
}

.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 16px;
}

.toolbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.selection-info {
  margin-bottom: 16px;
}

.empty-state {
  padding: 24px 0;
  color: var(--text-color-muted);
}

@media (max-width: 768px) {
  .data-table {
    padding: 16px;
  }
  .table-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .toolbar-actions {
    justify-content: flex-start;
  }
}
</style>
