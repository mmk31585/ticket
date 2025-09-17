<template>
  <div class="auth-page">
    <a-card class="auth-card" :bordered="false">
      <div class="auth-header">
        <h1>{{ t('auth.createAccount') }}</h1>
        <p>{{ t('app.description') }}</p>
      </div>
      <a-form layout="vertical" :model="formState" :rules="rules" @finish="handleSubmit">
        <a-form-item name="name" :label="t('auth.name')">
          <a-input v-model:value="formState.name" size="large" :placeholder="t('auth.name')" />
        </a-form-item>
        <a-form-item name="email" :label="t('auth.email')">
          <a-input v-model:value="formState.email" size="large" :placeholder="t('auth.email')" />
        </a-form-item>
        <a-form-item name="password" :label="t('auth.password')">
          <a-input-password
            v-model:value="formState.password"
            size="large"
            :placeholder="t('auth.password')"
          />
        </a-form-item>
        <a-form-item name="confirmPassword" :label="t('auth.confirmPassword')">
          <a-input-password
            v-model:value="formState.confirmPassword"
            size="large"
            :placeholder="t('auth.confirmPassword')"
          />
        </a-form-item>
        <a-button type="primary" html-type="submit" size="large" block :loading="loading">
          {{ t('auth.register') }}
        </a-button>
      </a-form>
      <div class="auth-footer">
        <span>{{ t('auth.hasAccount') }}</span>
        <router-link to="/login">{{ t('navigation.login') }}</router-link>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/modules/auth'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const formState = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)

const rules = {
  name: [
    { required: true, message: t('validation.required') },
    { min: 3, message: t('validation.minChars', { count: 3 }) },
  ],
  email: [
    { required: true, message: t('validation.required') },
    { type: 'email', message: t('validation.email') },
  ],
  password: [
    { required: true, message: t('validation.required') },
    { min: 8, message: t('validation.minPassword') },
  ],
  confirmPassword: [
    { required: true, message: t('validation.required') },
    {
      validator: (_: unknown, value: string) => {
        if (value !== formState.password) {
          return Promise.reject(t('validation.passwordMismatch'))
        }
        return Promise.resolve()
      },
    },
  ],
}

async function handleSubmit() {
  loading.value = true
  try {
    await authStore.register({
      name: formState.name,
      email: formState.email,
      password: formState.password,
    })
    message.success(t('auth.successRegister'))
    router.push({ name: 'login' })
  } catch (error) {
    message.error((error as Error).message || t('notifications.error'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, rgba(64, 150, 255, 0.2), transparent);
  padding: 24px;
}

.auth-card {
  max-width: 460px;
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.15);
  padding: 32px;
}

.auth-header h1 {
  margin-bottom: 8px;
  font-size: 1.5rem;
}

.auth-header p {
  margin: 0 0 24px;
  color: var(--text-color-muted);
}

.auth-footer {
  margin-top: 24px;
  display: flex;
  gap: 8px;
  justify-content: center;
  font-size: 0.9rem;
}

.auth-footer a {
  color: #1677ff;
  font-weight: 600;
}
</style>
