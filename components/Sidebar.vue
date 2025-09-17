<template>
  <div class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
    <div class="p-6 border-b border-slate-100 dark:border-slate-700">
      <h1 class="text-slate-800 dark:text-slate-200 text-xl">TicketFlow</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your tickets</p>
    </div>
    
    <nav class="flex-1 px-4 py-6">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="$emit('tab-change', item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 hover:shadow-sm',
          activeTab === item.id
            ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
    
    <!-- Dark Mode Toggle -->
    <div class="p-4 border-t border-slate-100 dark:border-slate-700">
      <button
        @click="$emit('toggle-dark-mode')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200"
      >
        <component :is="isDarkMode ? 'Sun' : 'Moon'" class="w-5 h-5" />
        <span>{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, Ticket, BarChart3, Settings, Sun, Moon } from 'lucide-vue-next'

interface Props {
  activeTab: string
  isDarkMode: boolean
}

defineProps<Props>()

defineEmits<{
  'tab-change': [tab: string]
  'toggle-dark-mode': []
}>()

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'tickets', icon: Ticket, label: 'Tickets' },
  { id: 'reports', icon: BarChart3, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]
</script>