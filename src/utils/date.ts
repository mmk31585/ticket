import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/fa'

dayjs.extend(jalaliday)
dayjs.extend(relativeTime)

dayjs.locale('fa')

export function formatJalali(input: string | number | Date, format = 'YYYY/MM/DD'): string {
  return dayjs(input).calendar('jalali').locale('fa').format(format)
}

export function formatJalaliDateTime(input: string | number | Date): string {
  return dayjs(input)
    .calendar('jalali')
    .locale('fa')
    .format('YYYY/MM/DD HH:mm')
}

export function jalaliFromNow(input: string | number | Date): string {
  return dayjs(input).calendar('jalali').locale('fa').fromNow()
}

export default dayjs
