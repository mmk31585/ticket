<template>
  <div>
    <page-header :title="t('about.title')" :breadcrumb="breadcrumb" />
    <a-row :gutter="16">
      <a-col :xs="24" :md="16">
        <a-card :bordered="false" class="about-card">
          <p>{{ t('about.body') }}</p>
          <ul class="about-list">
            <li>
              <span>{{ t('about.version') }}</span>
              <strong>۱.۰.۰</strong>
            </li>
            <li>
              <span>{{ t('about.team') }}</span>
              <strong>{{ t('about.teamNames') }}</strong>
            </li>
          </ul>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="about-card secondary">
          <h3>هدف محصول</h3>
          <p>
            این پنل برای مدیران کسب‌وکارهای محلی طراحی شده تا روند فروش، موجودی و ارتباط با مشتریان را از یک نقطه مدیریت کنند.
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/common/PageHeader.vue'

const { t } = useI18n()

const breadcrumb = computed(() => [
  { label: t('navigation.dashboard'), to: '/' },
  { label: t('navigation.about') },
])
</script>

<style scoped>
.about-card {
  border-radius: 18px;
  margin-bottom: 16px;
  line-height: 1.8;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about-list li {
  display: flex;
  justify-content: space-between;
  color: var(--text-color-muted);
}

.about-list strong {
  color: var(--text-color);
}

.secondary {
  background: linear-gradient(145deg, rgba(64, 150, 255, 0.12), rgba(64, 150, 255, 0.02));
}
</style>
