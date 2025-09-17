import type { PiniaPluginContext } from 'pinia'

type PersistOption = {
  key?: string
  paths?: string[]
}

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOption | PersistOption[]
  }
}

const STORAGE = typeof window !== 'undefined' ? window.localStorage : undefined

function saveState(key: string, state: Record<string, unknown>) {
  STORAGE?.setItem(key, JSON.stringify(state))
}

function readState<T>(key: string): T | null {
  const raw = STORAGE?.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch (error) {
    console.warn('خطا در خواندن وضعیت ذخیره شده', error)
    return null
  }
}

export function createPersistedStatePlugin() {
  return (context: PiniaPluginContext) => {
    const { options, store } = context
    const persistOptions = options.persist
    if (!persistOptions) return
    const configs = Array.isArray(persistOptions) ? persistOptions : [persistOptions]

    configs.forEach((config) => {
      const storageKey = config.key ?? `pinia-${store.$id}`
      const fromStorage = readState<Record<string, unknown>>(storageKey)
      if (fromStorage) {
        store.$patch(fromStorage)
      }

      store.$subscribe(
        (_, state) => {
          const data = config.paths
            ? config.paths.reduce((acc, path) => {
                acc[path] = (state as Record<string, unknown>)[path]
                return acc
              }, {} as Record<string, unknown>)
            : (state as Record<string, unknown>)
          saveState(storageKey, data)
        },
        { detached: true },
      )
    })
  }
}
