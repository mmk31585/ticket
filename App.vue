<template>
  <div :class="{ dark: isDarkMode }" class="h-screen flex transition-colors duration-300">
    <div class="h-screen flex bg-slate-50 dark:bg-slate-900">
      <!-- Sidebar -->
      <Sidebar 
        :activeTab="activeTab" 
        :isDarkMode="isDarkMode"
        @tab-change="setActiveTab"
        @toggle-dark-mode="toggleDarkMode"
      />
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <Header @new-ticket="handleNewTicket" />
        
        <!-- Dashboard Content -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6 max-w-6xl mx-auto">
            <div v-if="activeTab === 'tickets'">
              <SummaryCards :tickets="mockTickets" />
              <TicketList 
                :tickets="mockTickets"
                :selectedTicketId="selectedTicketId"
                @ticket-select="handleTicketSelect"
              />
            </div>
            
            <div v-else-if="activeTab === 'dashboard'" class="space-y-6">
              <h1 class="text-slate-800 dark:text-slate-200">Dashboard Overview</h1>
              <SummaryCards :tickets="mockTickets" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <h3 class="mb-4 text-slate-800 dark:text-slate-200">Recent Activity</h3>
                  <p class="text-slate-600 dark:text-slate-400">Activity feed would go here...</p>
                </div>
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <h3 class="mb-4 text-slate-800 dark:text-slate-200">Performance Metrics</h3>
                  <p class="text-slate-600 dark:text-slate-400">Charts and metrics would go here...</p>
                </div>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'reports'" class="space-y-6">
              <h1 class="text-slate-800 dark:text-slate-200">Reports</h1>
              <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <p class="text-slate-600 dark:text-slate-400">Reports and analytics would be displayed here</p>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'settings'" class="space-y-6">
              <h1 class="text-slate-800 dark:text-slate-200">Settings</h1>
              <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <p class="text-slate-600 dark:text-slate-400">Application settings would be configured here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sliding Detail Panel -->
      <TicketDetail 
        :ticket="selectedTicket" 
        :isOpen="isDetailPanelOpen"
        @close="handleCloseDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import SummaryCards from './components/SummaryCards.vue'
import TicketList from './components/TicketList.vue'
import TicketDetail from './components/TicketDetail.vue'
import { mockTickets } from './components/mockData'

const activeTab = ref('tickets')
const selectedTicketId = ref<string | null>(null)
const isDetailPanelOpen = ref(false)
const isDarkMode = ref(false)

const selectedTicket = computed(() => {
  return selectedTicketId.value 
    ? mockTickets.find(ticket => ticket.id === selectedTicketId.value) || null
    : null
})

const handleNewTicket = () => {
  console.log('Create new ticket')
  // This would open a modal or navigate to a new ticket form
}

const handleTicketSelect = (ticketId: string) => {
  selectedTicketId.value = ticketId
  isDetailPanelOpen.value = true
}

const handleCloseDetail = () => {
  isDetailPanelOpen.value = false
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = savedDarkMode === 'true'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})
</script>