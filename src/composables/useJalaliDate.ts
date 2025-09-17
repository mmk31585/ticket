import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatJalali, formatJalaliDateTime } from '@/utils/date'

/**
 * قلاب کمکی برای فرمت تاریخ به تقویم جلالی در رابط کاربری
 */
export function useJalaliDate() {
  const { locale } = useI18n()

  const localeValue = computed(() => locale.value)

  const formatDate = (input: string | number | Date, format?: string) =>
    formatJalali(input, format)

  const formatDateTime = (input: string | number | Date) => formatJalaliDateTime(input)

  return {
    locale: localeValue,
    formatDate,
    formatDateTime,
  }
}

export default useJalaliDate
