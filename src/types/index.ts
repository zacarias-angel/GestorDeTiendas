// User types
export interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

// Store types
export interface Store {
  id: number
  userId: number
  name: string
  slug: string
  description?: string
  logo?: string
  banner?: string
  primaryColor: string
  secondaryColor: string
  isActive: boolean
  stripeAccountId?: string
  config: StoreConfig
  createdAt: string
  updatedAt: string
}

export interface StoreConfig {
  theme: 'light' | 'dark'
  layout: 'grid' | 'list'
  showReviews: boolean
  showStock: boolean
  currency: string
  language: string
}

// Product types
export interface Product {
  id: number
  storeId: number
  name: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  sku?: string
  category: string
  images: string[]
  isActive: boolean
  isFeatured: boolean
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: number
  productId: number
  name: string
  value: string
  price?: number
  stock: number
  sku?: string
}

// Order types
export interface Order {
  id: number
  storeId: number
  customerId?: number
  customerEmail: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  notes?: string
  stripePaymentIntentId?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  productImage: string
  quantity: number
  price: number
  total: number
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

// Address types
export interface Address {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

// Cart types
export interface CartItem {
  productId: number
  quantity: number
  product: Product
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  storeName: string
  storeSlug: string
}

export interface AuthUser {
  user: User
  token: string
  refreshToken: string
}

// Stripe types
export interface StripeAccount {
  id: string
  storeId: number
  accountId: string
  isEnabled: boolean
  chargesEnabled: boolean
  payoutsEnabled: boolean
  createdAt: string
  updatedAt: string
}

// Analytics types
export interface StoreAnalytics {
  totalSales: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  salesByMonth: SalesData[]
  topProducts: TopProduct[]
  recentOrders: Order[]
}

export interface SalesData {
  month: string
  sales: number
  orders: number
}

export interface TopProduct {
  productId: number
  productName: string
  totalSold: number
  revenue: number
} 