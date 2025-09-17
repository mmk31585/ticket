import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from '@/stores/plugins/persist'

const pinia = createPinia()
pinia.use(createPersistedStatePlugin())

export default pinia
