<template>
  <div class="auth-page">
    <a-card class="auth-card" :bordered="false">
      <div class="auth-header">
        <h1>{{ t('auth.welcomeBack') }}</h1>
        <p>{{ t('app.description') }}</p>
      </div>
      <a-form layout="vertical" :model="formState" :rules="rules" @finish="handleSubmit">
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
        <div class="form-extra">
          <a-checkbox v-model:checked="formState.rememberMe">{{ t('auth.remember') }}</a-checkbox>
        </div>
        <a-button type="primary" html-type="submit" size="large" block :loading="loading">
          {{ t('auth.login') }}
        </a-button>
      </a-form>
      <div class="auth-footer">
        <span>{{ t('auth.noAccount') }}</span>
        <router-link to="/register">{{ t('navigation.register') }}</router-link>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/modules/auth'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const formState = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)

const rules = {
  email: [
    { required: true, message: t('validation.required') },
    { type: 'email', message: t('validation.email') },
  ],
  password: [
    { required: true, message: t('validation.required') },
    { min: 8, message: t('validation.minPassword') },
  ],
}

async function handleSubmit() {
  loading.value = true
  try {
    await authStore.login(formState)
    message.success(t('auth.successLogin'))
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
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
  max-width: 420px;
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

.form-extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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
