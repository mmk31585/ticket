import { defineStore } from 'pinia'

export interface ProfileState {
  fullName: string
  email: string
  phone: string
  city: string
  bio: string
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    fullName: 'مدیر بازارچه',
    email: 'modir@bazaarche.ir',
    phone: '09120000000',
    city: 'تهران',
    bio: 'علاقه‌مند به محصولات اصیل و توسعه بازارهای محلی.',
  }),
  actions: {
    updateProfile(payload: Partial<ProfileState>) {
      this.$patch(payload)
    },
  },
  persist: {
    key: 'bazaar-profile',
  },
})
