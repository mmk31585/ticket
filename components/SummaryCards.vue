<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div
      v-for="item in summaryData"
      :key="item.title"
      :class="[
        'p-6 rounded-2xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border',
        `bg-gradient-to-br ${item.bgGradient} border-slate-200 dark:border-slate-600`
      ]"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-slate-600 dark:text-slate-400 mb-2 text-sm">{{ item.title }} Tickets</p>
          <p class="text-3xl text-slate-800 dark:text-slate-200">{{ item.count }}</p>
        </div>
        <span
          :class="[
            'text-xs px-3 py-1 rounded-lg border',
            item.color
          ]"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Ticket {
  status: 'open' | 'in-progress' | 'closed'
}

interface Props {
  tickets: Ticket[]
}

const props = defineProps<Props>()

const openCount = computed(() => 
  props.tickets.filter(ticket => ticket.status === 'open').length
)

const inProgressCount = computed(() => 
  props.tickets.filter(ticket => ticket.status === 'in-progress').length
)

const closedCount = computed(() => 
  props.tickets.filter(ticket => ticket.status === 'closed').length
)

const summaryData = computed(() => [
  {
    title: 'Open',
    count: openCount.value,
    badge: 'open',
    color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
  },
  {
    title: 'In Progress',
    count: inProgressCount.value,
    badge: 'in-progress',
    color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
    bgGradient: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
  },
  {
    title: 'Closed',
    count: closedCount.value,
    badge: 'closed',
    color: 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    bgGradient: 'from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50'
  }
])
</script>