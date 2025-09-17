<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      name="overlay"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && ticket"
        class="fixed inset-0 bg-black/20 z-40"
        @click="$emit('close')"
      />
    </Transition>
    
    <!-- Sliding Panel -->
    <Transition
      name="slide"
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen && ticket"
        class="fixed right-0 top-0 h-full w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-y-auto transition-colors duration-300"
      >
        <div class="p-6 space-y-6">
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex-1 pr-4">
              <h2 class="leading-tight mb-3 text-slate-800 dark:text-slate-200">{{ ticket.title }}</h2>
              <span
                :class="[
                  'text-xs px-3 py-1 rounded-full border',
                  getStatusColor(ticket.status)
                ]"
              >
                {{ formatStatus(ticket.status) }}
              </span>
            </div>
            <button
              @click="$emit('close')"
              class="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X class="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <!-- Ticket Details -->
          <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 space-y-3">
            <div class="flex items-center gap-3 text-sm">
              <AlertCircle :class="['w-4 h-4', getPriorityColor(ticket.priority)]" />
              <span class="text-slate-600 dark:text-slate-400">Priority:</span>
              <span class="capitalize text-slate-800 dark:text-slate-200">{{ ticket.priority }}</span>
            </div>
            
            <div class="flex items-center gap-3 text-sm">
              <User class="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span class="text-slate-600 dark:text-slate-400">Assignee:</span>
              <div class="flex items-center gap-2">
                <div class="h-5 w-5 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                  {{ ticket.assignee.avatar }}
                </div>
                <span class="text-slate-800 dark:text-slate-200">{{ ticket.assignee.name }}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3 text-sm">
              <Calendar class="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span class="text-slate-600 dark:text-slate-400">Created:</span>
              <span class="text-slate-800 dark:text-slate-200">{{ ticket.date }}</span>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="mb-3 text-slate-800 dark:text-slate-200">Description</h3>
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                {{ ticket.description || "No description provided." }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-3 gap-3">
            <button class="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-xl h-11 flex items-center justify-center gap-2 transition-colors duration-200">
              <MessageSquare class="w-4 h-4" />
              Reply
            </button>
            <button class="border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl h-11 flex items-center justify-center gap-2 transition-colors duration-200 text-slate-700 dark:text-slate-300">
              <UserPlus class="w-4 h-4" />
              Assign
            </button>
            <button class="border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl h-11 flex items-center justify-center gap-2 transition-colors duration-200 text-slate-700 dark:text-slate-300">
              <CheckCircle2 class="w-4 h-4" />
              Close
            </button>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700"></div>

          <!-- Activity Timeline -->
          <div>
            <h3 class="mb-4 text-slate-800 dark:text-slate-200">Activity Timeline</h3>
            <div class="space-y-4">
              <div
                v-for="(item, index) in activityItems"
                :key="index"
                class="group"
              >
                <div class="flex gap-3">
                  <div class="flex flex-col items-center">
                    <div class="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm rounded-full bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-800 dark:to-blue-800 flex items-center justify-center text-xs text-teal-700 dark:text-teal-300">
                      {{ item.avatar }}
                    </div>
                    <div
                      v-if="index < activityItems.length - 1"
                      class="w-px h-8 bg-slate-200 dark:bg-slate-600 mt-2"
                    ></div>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 group-hover:shadow-sm transition-shadow">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm text-slate-800 dark:text-slate-200">{{ item.user }}</span>
                        <span class="text-xs text-slate-500 dark:text-slate-400">{{ item.time }}</span>
                      </div>
                      <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">{{ item.action }}</p>
                      <p
                        v-if="item.message"
                        class="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-lg p-2"
                      >
                        {{ item.message }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Calendar, AlertCircle, User, X, MessageSquare, UserPlus, CheckCircle2 } from 'lucide-vue-next'

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
  ticket: Ticket | null
  isOpen: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
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

const activityItems = [
  { 
    time: '2 hours ago', 
    action: 'Ticket created', 
    user: 'John Doe',
    avatar: 'JD',
    type: 'created',
    message: 'Created this ticket and assigned to team member'
  },
  { 
    time: '1 hour ago', 
    action: 'Status changed to In Progress', 
    user: 'Jane Smith',
    avatar: 'JS',
    type: 'status',
    message: 'Started working on this issue'
  },
  { 
    time: '30 minutes ago', 
    action: 'Comment added', 
    user: 'Mike Johnson',
    avatar: 'MJ',
    type: 'comment',
    message: 'I think we should prioritize the mobile browser compatibility first, then work on the desktop version.'
  },
]
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>