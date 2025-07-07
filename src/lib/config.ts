export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },

  // App Configuration
  app: {
    name: 'TiendaSaaS',
    description: 'Plataforma de tiendas online',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '1.0.0',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    connectClientId: process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID || '',
  },

  // Cloudinary Configuration (for image uploads)
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  },

  // Authentication
  auth: {
    tokenKey: 'tiendasaas_token',
    refreshTokenKey: 'tiendasaas_refresh_token',
    userKey: 'tiendasaas_user',
  },

  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  // Currency
  currency: {
    default: 'USD',
    symbol: '$',
  },

  // File upload limits
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
}

export default config 