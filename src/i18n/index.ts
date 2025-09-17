import { createI18n } from 'vue-i18n'
import fa from '@/locales/fa.json'

export const defaultLocale = 'fa-IR'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    [defaultLocale]: fa,
  },
  datetimeFormats: {
    [defaultLocale]: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  },
  numberFormats: {
    [defaultLocale]: {
      currency: {
        style: 'currency',
        currency: 'IRR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
      },
      decimal: {
        style: 'decimal',
        useGrouping: true,
        maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        maximumFractionDigits: 1,
      },
    },
  },
})

export default i18n
