<template>
  <div
    @click="$emit('click')"
    :class="[
      'p-5 cursor-pointer transition-all duration-200 border rounded-xl hover:shadow-lg hover:-translate-y-0.5',
      isSelected 
        ? 'border-teal-300 dark:border-teal-600 bg-teal-50 dark:bg-teal-900/30 shadow-lg ring-2 ring-teal-100 dark:ring-teal-800' 
        : 'border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-600 bg-white dark:bg-slate-800'
    ]"
  >
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="line-clamp-2 flex-1 leading-relaxed text-slate-800 dark:text-slate-200">
          {{ ticket.title }}
        </h3>
        <span
          :class="[
            'text-xs px-2 py-1 rounded-lg border',
            getStatusColor(ticket.status)
          ]"
        >
          {{ formatStatus(ticket.status) }}
        </span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <AlertCircle :class="['w-4 h-4', getPriorityColor(ticket.priority)]" />
            <span class="text-sm text-slate-600 dark:text-slate-400 capitalize">{{ ticket.priority }}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="h-6 w-6 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {{ ticket.assignee.avatar }}
            </div>
            <span class="text-sm text-slate-600 dark:text-slate-400">{{ ticket.assignee.name }}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Calendar class="w-4 h-4" />
          <span>{{ ticket.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, AlertCircle } from 'lucide-vue-next'

interface Ticket {
  id: string
  title: string
  status: 'open' | 'in-progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  date: string
  assignee: { name: string; avatar: string }
  description: string
}

interface Props {
  ticket: Ticket
  isSelected: boolean
}

defineProps<Props>()

defineEmits<{
  click: []
}>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700'
    case 'in-progress':
      return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700'
    case 'closed':
      return 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
    default:
      return 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-500 dark:text-red-400'
    case 'medium':
      return 'text-amber-500 dark:text-amber-400'
    case 'low':
      return 'text-emerald-500 dark:text-emerald-400'
    default:
      return 'text-slate-500 dark:text-slate-400'
  }
}

const formatStatus = (status: string) => {
  return status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)
}
</script>