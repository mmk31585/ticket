<template>
  <div>
    <page-header
      :title="pageTitle"
      :description="t('products.formHelp')"
      :breadcrumb="breadcrumb"
    />
    <form-card :title="pageTitle" :description="t('products.formHelp')">
      <a-form layout="vertical" :model="formState" :rules="rules" @finish="handleSubmit">
        <a-row :gutter="16">
          <a-col :xs="24" :md="12">
            <a-form-item name="name" :label="t('products.name')">
              <a-input v-model:value="formState.name" :placeholder="t('products.name')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item name="sku" :label="t('products.sku')">
              <a-input v-model:value="formState.sku" :placeholder="t('products.sku')" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12">
            <a-form-item name="price" :label="t('products.price')">
              <a-input-number
                v-model:value="formState.price"
                :min="0"
                :formatter="priceFormatter"
                :parser="priceParser"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item name="stock" :label="t('products.stock')">
              <a-input-number v-model:value="formState.stock" :min="0" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xs="24" :md="12">
            <a-form-item name="status" :label="t('products.status')">
              <a-select v-model:value="formState.status" :placeholder="t('products.status')">
                <a-select-option value="active">{{ t('products.statusActive') }}</a-select-option>
                <a-select-option value="draft">{{ t('products.statusDraft') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item name="category" :label="t('products.category')">
              <a-input v-model:value="formState.category" :placeholder="t('products.category')" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item name="description" :label="t('products.description')">
          <a-textarea
            v-model:value="formState.description"
            :rows="4"
            :placeholder="t('products.description')"
          />
        </a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" :loading="loading">
            {{ isEdit ? t('products.submitEdit') : t('products.submitCreate') }}
          </a-button>
          <a-button @click="goBack">{{ t('actions.cancel') }}</a-button>
        </a-space>
      </a-form>
    </form-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import FormCard from '@/components/common/FormCard.vue'
import { createProduct, fetchProductById, updateProduct } from '@/mocks/api'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const isEdit = computed(() => route.meta.mode === 'edit')

const formState = reactive({
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  status: 'active',
  category: '',
  description: '',
})

const loading = ref(false)

const rules = {
  name: [{ required: true, message: t('validation.required') }],
  sku: [{ required: true, message: t('validation.required') }],
  price: [
    { required: true, message: t('validation.required') },
    {
      validator: (_: unknown, value: number) => {
        if (value <= 0) {
          return Promise.reject(t('validation.positiveNumber'))
        }
        return Promise.resolve()
      },
    },
  ],
  stock: [{ required: true, message: t('validation.required') }],
  status: [{ required: true, message: t('validation.selectOption') }],
  category: [{ required: true, message: t('validation.required') }],
  description: [{ required: true, message: t('validation.required') }],
}

const breadcrumb = computed(() => [
  { label: t('navigation.dashboard'), to: '/' },
  { label: t('products.title'), to: { name: 'products-list' } },
  { label: pageTitle.value },
])

const pageTitle = computed(() =>
  isEdit.value ? t('products.editTitle') : t('products.createTitle'),
)

const priceFormatter = (value?: number | string) =>
  value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬') : ''

const priceParser = (value?: string) => (value ? Number(value.replace(/[^\d]/g, '')) : 0)

async function loadProduct() {
  if (!isEdit.value) return
  loading.value = true
  try {
    const product = await fetchProductById(route.params.id as string)
    Object.assign(formState, product)
  } catch (error) {
    message.error((error as Error).message || t('notifications.error'))
    router.push({ name: 'products-list' })
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  loading.value = true
  try {
    if (isEdit.value) {
      await updateProduct(route.params.id as string, formState as Partial<Product>)
      message.success(t('products.successUpdate'))
    } else {
      await createProduct(formState as unknown as Product)
      message.success(t('products.successCreate'))
    }
    router.push({ name: 'products-list' })
  } catch (error) {
    message.error((error as Error).message || t('notifications.error'))
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}

onMounted(loadProduct)
</script>
