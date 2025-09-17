import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

function applyThemeClass(mode: ThemeMode) {
  const body = typeof document !== 'undefined' ? document.body : null
  if (!body) return
  body.classList.toggle('dark-theme', mode === 'dark')
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    mode: 'light',
  }),
  actions: {
    setMode(mode: ThemeMode) {
      this.mode = mode
      applyThemeClass(mode)
    },
    toggle() {
      this.setMode(this.mode === 'light' ? 'dark' : 'light')
    },
    hydrate() {
      applyThemeClass(this.mode)
    },
  },
  persist: {
    key: 'bazaar-theme',
    paths: ['mode'],
  },
})
