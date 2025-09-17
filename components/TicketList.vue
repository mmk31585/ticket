<template>
  <div class="space-y-3">
    <h2 class="mb-4 text-slate-800 dark:text-slate-200">Recent Tickets</h2>
    <div class="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        :isSelected="selectedTicketId === ticket.id"
        @click="$emit('ticket-select', ticket.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TicketCard from './TicketCard.vue'

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
  tickets: Ticket[]
  selectedTicketId: string | null
}

defineProps<Props>()

defineEmits<{
  'ticket-select': [ticketId: string]
}>()
</script>