<template>
  <div>
    <page-header
      :title="t('navigation.dashboard')"
      :description="t('app.description')"
      :breadcrumb="breadcrumb"
    />
    <a-row :gutter="16" class="kpi-grid">
      <a-col :xs="24" :sm="12" :xl="6" v-for="card in kpiCards" :key="card.title">
        <a-card :bordered="false" class="kpi-card">
          <div class="kpi-meta">
            <span class="kpi-label">{{ card.title }}</span>
            <span class="kpi-value">{{ card.value }}</span>
          </div>
          <span class="kpi-footnote">{{ card.footnote }}</span>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :xs="24" :lg="16">
        <a-card :title="t('dashboard.trafficTitle')" :bordered="false" class="chart-card">
          <div class="chart-wrapper">
            <svg :viewBox="`0 0 200 60`" role="img" aria-label="نمودار بازدید هفتگی">
              <polyline :points="chartPoints" fill="none" stroke="#1677ff" stroke-width="3" />
              <polyline
                :points="chartFillPoints"
                fill="url(#gradient)"
                stroke="transparent"
                stroke-width="0"
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="rgba(22, 119, 255, 0.35)" />
                  <stop offset="100%" stop-color="rgba(22, 119, 255, 0.05)" />
                </linearGradient>
              </defs>
            </svg>
            <ul class="chart-legend">
              <li v-for="(day, index) in weekDays" :key="day">
                <span class="dot" />
                <span>{{ day }}</span>
                <strong>{{ weeklyTraffic[index] }}</strong>
              </li>
            </ul>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card :bordered="false" class="summary-card">
          <h3>آخرین به‌روزرسانی</h3>
          <p>{{ lastUpdated }}</p>
          <ul class="summary-list">
            <li>
              <span>تعداد کاربران فعال</span>
              <strong>{{ stats?.activeUsers?.toLocaleString('fa-IR') }}</strong>
            </li>
            <li>
              <span>میانگین نرخ تبدیل</span>
              <strong>{{ percentFormatter.format(stats?.conversionRate ?? 0) }}</strong>
            </li>
            <li>
              <span>درخواست‌های تازه</span>
              <strong>{{ stats?.newTickets }}</strong>
            </li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/common/PageHeader.vue'
import { fetchDashboardStats } from '@/mocks/api'
import useJalaliDate from '@/composables/useJalaliDate'

const { t } = useI18n()
const { formatDateTime } = useJalaliDate()

const breadcrumb = computed(() => [{ label: t('navigation.dashboard') }])

const stats = ref<{
  activeUsers: number
  totalSales: number
  conversionRate: number
  newTickets: number
  weeklyTraffic: number[]
} | null>(null)

const lastUpdated = computed(() => formatDateTime(new Date()))

const currencyFormatter = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR',
  maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('fa-IR', {
  style: 'percent',
  maximumFractionDigits: 1,
})

const weeklyTraffic = computed(() => stats.value?.weeklyTraffic ?? [])

const kpiCards = computed(() => {
  if (!stats.value) return []
  return [
    {
      title: t('dashboard.todayActiveUsers'),
      value: stats.value.activeUsers.toLocaleString('fa-IR'),
      footnote: 'کاربر در ۲۴ ساعت اخیر',
    },
    {
      title: t('dashboard.totalSales'),
      value: currencyFormatter.format(stats.value.totalSales),
      footnote: 'مبالغ نهایی شده در ماه جاری',
    },
    {
      title: t('dashboard.conversionRate'),
      value: percentFormatter.format(stats.value.conversionRate),
      footnote: 'نسبت تبدیل لیدها به خرید',
    },
    {
      title: t('dashboard.newTickets'),
      value: stats.value.newTickets.toLocaleString('fa-IR'),
      footnote: 'درخواست‌های ثبت شده امروز',
    },
  ]
})

const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

const chartPoints = computed(() => {
  if (!weeklyTraffic.value.length) return ''
  const max = Math.max(...weeklyTraffic.value)
  const min = Math.min(...weeklyTraffic.value)
  return weeklyTraffic.value
    .map((point, index) => {
      const x = (index / (weeklyTraffic.value.length - 1)) * 180 + 10
      const normalized = max === min ? 0.5 : (point - min) / (max - min)
      const y = 50 - normalized * 40
      return `${x},${y}`
    })
    .join(' ')
})

const chartFillPoints = computed(() => {
  if (!chartPoints.value) return ''
  return `${chartPoints.value} 190,60 10,60`
})

async function loadStats() {
  stats.value = await fetchDashboardStats()
}

onMounted(loadStats)
</script>

<style scoped>
.kpi-grid {
  margin-bottom: 16px;
}

.kpi-card {
  background: linear-gradient(145deg, rgba(22, 119, 255, 0.1), rgba(22, 119, 255, 0.02));
  border-radius: 18px;
  padding: 20px;
}

.kpi-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kpi-label {
  color: var(--text-color-muted);
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 700;
}

.kpi-footnote {
  font-size: 0.85rem;
  color: var(--text-color-muted);
}

.chart-card {
  border-radius: 18px;
}

.chart-wrapper {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.chart-wrapper svg {
  width: 60%;
  min-width: 220px;
}

.chart-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.chart-legend li {
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 12px;
  color: var(--text-color-muted);
}

.chart-legend .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1677ff;
}

.summary-card {
  border-radius: 18px;
  height: 100%;
}

.summary-card h3 {
  margin-top: 0;
}

.summary-card p {
  color: var(--text-color-muted);
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-list li {
  display: flex;
  justify-content: space-between;
}

.summary-list strong {
  color: var(--text-color);
}
</style>
