export type ProductStatus = 'active' | 'draft'

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  status: ProductStatus
  category: string
  description: string
  createdAt: string
  updatedAt: string
}
