import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import useJalaliDate from '@/composables/useJalaliDate'

const i18n = createI18n({
  legacy: false,
  locale: 'fa-IR',
  messages: { 'fa-IR': {} },
})

describe('useJalaliDate', () => {
  it('تاریخ را به قالب جلالی تبدیل می‌کند', () => {
    const wrapper = mount(
      {
        template: '<div />',
        setup() {
          return useJalaliDate()
        },
      },
      {
        global: {
          plugins: [i18n],
        },
      },
    )
    const formatted = wrapper.vm.formatDate('2024-03-01')
    expect(formatted).toMatch(/۱۴۰۲/)
  })

  it('تاریخ و زمان را با ساعت نمایش می‌دهد', () => {
    const wrapper = mount(
      {
        template: '<div />',
        setup() {
          return useJalaliDate()
        },
      },
      {
        global: {
          plugins: [i18n],
        },
      },
    )
    const formatted = wrapper.vm.formatDateTime('2024-03-01T08:30:00Z')
    expect(formatted).toContain(':')
  })
})
