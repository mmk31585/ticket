import { config } from '@vue/test-utils'

config.global.stubs = {
  transition: false,
  'a-config-provider': false,
}
