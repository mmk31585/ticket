<template>
  <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between transition-colors duration-300">
    <div class="flex items-center gap-4 flex-1 max-w-md">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
        <input
          v-model="searchQuery"
          placeholder="Search tickets..."
          class="w-full pl-10 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl h-10 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-600 transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
        />
      </div>
    </div>
    
    <button
      @click="$emit('new-ticket')"
      class="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
    >
      <Plus class="w-5 h-5" />
      New Ticket
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Plus } from 'lucide-vue-next'

defineEmits<{
  'new-ticket': []
}>()

const searchQuery = ref('')
</script>