import type { ThemeConfig } from 'ant-design-vue'
import { theme } from 'ant-design-vue'

const sharedTokens = {
  borderRadius: 12,
  fontFamily: "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  controlHeight: 40,
  colorLink: '#1677ff',
  colorLinkHover: '#4096ff',
  colorSuccess: '#52c41a',
  colorInfo: '#1677ff',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  wireframe: false,
}

export const lightTheme: ThemeConfig = {
  token: {
    ...sharedTokens,
    colorBgLayout: '#f5f6f8',
    colorBgContainer: '#ffffff',
    colorBorder: '#d6dae2',
    colorText: '#1f1f1f',
    colorTextSecondary: '#5c5f6a',
    colorPrimary: '#1677ff',
    boxShadow: '0 10px 30px rgba(22, 119, 255, 0.08)',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
    },
    Card: {
      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
      padding: 20,
    },
    Button: {
      paddingInline: 18,
    },
  },
}

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...sharedTokens,
    colorBgLayout: '#121417',
    colorBgContainer: '#1a1d23',
    colorBorder: '#2a2f37',
    colorText: '#f7f8fa',
    colorTextSecondary: '#c3c6ce',
    colorPrimary: '#4096ff',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
  },
  components: {
    Layout: {
      headerBg: '#1a1d23',
    },
    Card: {
      colorBgContainer: '#1f232b',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
    },
  },
}
