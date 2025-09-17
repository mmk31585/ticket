<template>
  <div>
    <page-header :title="t('settings.title')" :breadcrumb="breadcrumb" />
    <a-row :gutter="16">
      <a-col :xs="24" :lg="16">
        <form-card :title="t('settings.profile')" :description="t('settings.profileDescription')">
          <a-form layout="vertical" :model="profile" :rules="rules" @finish="saveProfile">
            <a-row :gutter="16">
              <a-col :xs="24" :md="12">
                <a-form-item name="fullName" :label="t('auth.name')">
                  <a-input v-model:value="profile.fullName" :placeholder="t('auth.name')" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item name="email" :label="t('auth.email')">
                  <a-input v-model:value="profile.email" :placeholder="t('auth.email')" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :xs="24" :md="12">
                <a-form-item name="phone" label="شماره تماس">
                  <a-input v-model:value="profile.phone" placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item name="city" label="شهر">
                  <a-input v-model:value="profile.city" placeholder="مثال: تهران" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item name="bio" label="معرفی کوتاه">
              <a-textarea v-model:value="profile.bio" :rows="4" placeholder="معرفی خود را بنویسید..." />
            </a-form-item>
            <a-space>
              <a-button type="primary" html-type="submit" :loading="saving">
                {{ t('actions.save') }}
              </a-button>
              <a-button @click="resetProfile">{{ t('actions.cancel') }}</a-button>
            </a-space>
          </a-form>
        </form-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-space direction="vertical" style="width: 100%">
          <form-card :title="t('settings.theme')" :description="t('settings.themeDescription')">
            <theme-toggle />
          </form-card>
          <a-card :bordered="false" class="info-card">
            <a-alert type="info" show-icon :message="t('settings.languageHint')" />
          </a-card>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import FormCard from '@/components/common/FormCard.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useProfileStore } from '@/stores/modules/profile'

const { t } = useI18n()
const profileStore = useProfileStore()

const breadcrumb = computed(() => [
  { label: t('navigation.dashboard'), to: '/' },
  { label: t('navigation.settings') },
])

const profile = reactive({ ...profileStore.$state })
const saving = ref(false)

const rules = {
  fullName: [{ required: true, message: t('validation.required') }],
  email: [
    { required: true, message: t('validation.required') },
    { type: 'email', message: t('validation.email') },
  ],
}

function resetProfile() {
  Object.assign(profile, profileStore.$state)
}

async function saveProfile() {
  saving.value = true
  try {
    profileStore.updateProfile(profile)
    message.success(t('settings.successProfile'))
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.info-card {
  border-radius: 18px;
}
</style>
