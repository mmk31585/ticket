import { products as seedProducts } from '@/data/products'
import type { Product } from '@/types/product'

let productsStore = [...seedProducts]

const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  name: string
}

export async function login(payload: LoginPayload) {
  await wait()
  if (!payload.email.includes('@') || payload.password.length < 6) {
    throw new Error('نام کاربری یا رمز عبور نامعتبر است')
  }
  return {
    token: 'mock-token-123',
    user: {
      id: 'u-1',
      name: 'مدیر بازارچه',
      email: payload.email,
      role: 'مدیر سیستم',
    },
  }
}

export async function register(payload: RegisterPayload) {
  await wait()
  return {
    success: true,
  }
}

export interface ProductsQuery {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  sortField?: keyof Product
  sortOrder?: 'ascend' | 'descend'
}

export async function fetchProducts(query: ProductsQuery = {}) {
  await wait()
  const {
    page = 1,
    pageSize = 5,
    search = '',
    status,
    sortField = 'createdAt',
    sortOrder = 'descend',
  } = query

  const normalizedSearch = search.trim().toLowerCase()

  let filtered = [...productsStore]

  if (normalizedSearch) {
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.sku.toLowerCase().includes(normalizedSearch),
    )
  }

  if (status && status !== 'all') {
    filtered = filtered.filter((item) => item.status === status)
  }

  filtered.sort((a, b) => {
    const valueA = a[sortField]
    const valueB = b[sortField]
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'ascend' ? valueA - valueB : valueB - valueA
    }
    return sortOrder === 'ascend'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA))
  })

  const total = filtered.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)

  return {
    items,
    total,
  }
}

export async function fetchProductById(id: string) {
  await wait()
  const product = productsStore.find((item) => item.id === id)
  if (!product) {
    throw new Error('محصول موردنظر یافت نشد')
  }
  return product
}

export async function createProduct(payload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  await wait()
  const newProduct: Product = {
    ...payload,
    id: (productsStore.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  productsStore = [newProduct, ...productsStore]
  return newProduct
}

export async function updateProduct(id: string, payload: Partial<Product>) {
  await wait()
  const index = productsStore.findIndex((item) => item.id === id)
  if (index === -1) {
    throw new Error('محصولی با این شناسه یافت نشد')
  }
  const updated: Product = {
    ...productsStore[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  }
  productsStore.splice(index, 1, updated)
  return updated
}

export async function deleteProduct(id: string) {
  await wait()
  productsStore = productsStore.filter((item) => item.id !== id)
  return { success: true }
}

export async function fetchDashboardStats() {
  await wait(300)
  return {
    activeUsers: 1280,
    totalSales: 428000000,
    conversionRate: 0.127,
    newTickets: 34,
    weeklyTraffic: [120, 180, 220, 260, 310, 280, 340],
  }
}
