import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'
import { i18n } from '@/i18n'
import { useThemeStore } from '@/stores/modules/theme'

import 'ant-design-vue/dist/reset.css'
import '@/styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

const themeStore = useThemeStore()
themeStore.hydrate()

app.mount('#app')
