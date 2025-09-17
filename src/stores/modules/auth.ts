import { defineStore } from 'pinia'
import type { LoginPayload, RegisterPayload } from '@/mocks/api'
import { login as apiLogin, register as apiRegister } from '@/mocks/api'

interface AuthState {
  token: string | null
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
  rememberMe: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    rememberMe: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    async login(payload: LoginPayload & { rememberMe?: boolean }) {
      const response = await apiLogin(payload)
      this.token = response.token
      this.user = response.user
      this.rememberMe = Boolean(payload.rememberMe)
      return response
    },
    async register(payload: RegisterPayload) {
      return apiRegister(payload)
    },
    logout() {
      this.token = null
      this.user = null
      this.rememberMe = false
    },
  },
  persist: {
    key: 'bazaar-auth',
    paths: ['token', 'user', 'rememberMe'],
  },
})
