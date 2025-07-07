# TiendaSaaS - Frontend

Plataforma SaaS para crear tiendas online. Frontend desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Responsive Design** para móviles y desktop
- **Rutas dinámicas** para tiendas individuales
- **Panel de administración** completo
- **Autenticación** con JWT
- **Integración con Stripe** para pagos
- **Optimización de imágenes** con Next.js Image

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── admin/             # Panel de administración
│   │   ├── layout.tsx     # Layout del admin
│   │   ├── page.tsx       # Dashboard
│   │   └── products/      # Gestión de productos
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── [storeSlug]/       # Tiendas públicas (rutas dinámicas)
│   │   ├── layout.tsx     # Layout de tienda
│   │   └── page.tsx       # Página principal de tienda
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Landing page
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuración
│   └── config.ts          # Configuración de la app
├── types/                 # Tipos TypeScript
│   └── index.ts           # Interfaces y tipos
└── utils/                 # Funciones utilitarias
```

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **ESLint** - Linter
- **Prettier** - Formateador de código

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd tienda/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID=ca_...
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificar tipos TypeScript
```

## 🎨 Rutas Principales

### Páginas Públicas
- `/` - Landing page principal
- `/login` - Página de login
- `/register` - Página de registro
- `/[storeSlug]` - Tienda pública (ej: `/mi-tienda`)

### Panel de Administración
- `/admin` - Dashboard principal
- `/admin/products` - Gestión de productos
- `/admin/orders` - Gestión de pedidos
- `/admin/settings` - Configuración de la tienda

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend API | `http://localhost:3001/api` |
| `NEXT_PUBLIC_APP_URL` | URL de la aplicación | `http://localhost:3000` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `pk_test_...` |
| `NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID` | Client ID de Stripe Connect | `ca_...` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nombre de la nube de Cloudinary | `my-cloud` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Preset de upload de Cloudinary | `my-preset` |

### Configuración de Tailwind

El proyecto usa Tailwind CSS con configuración personalizada en `tailwind.config.js`. Los colores principales son:

- **Primary**: Blue (azul)
- **Secondary**: Gray (gris)
- **Success**: Green (verde)
- **Warning**: Yellow (amarillo)
- **Error**: Red (rojo)

## 📱 Responsive Design

El proyecto está optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔐 Autenticación

El sistema de autenticación usa JWT tokens almacenados en localStorage:

- `tiendasaas_token` - Token de acceso
- `tiendasaas_refresh_token` - Token de renovación
- `tiendasaas_user` - Datos del usuario

## 💳 Integración con Stripe

### Stripe Connect
- Cada tienda puede conectar su propia cuenta de Stripe
- Los pagos van directamente a la cuenta de la tienda
- Comisión automática para la plataforma

### Configuración
1. Crear cuenta en Stripe
2. Configurar Stripe Connect
3. Obtener las claves de API
4. Configurar webhooks

## 🖼️ Gestión de Imágenes

### Cloudinary
- Upload directo desde el frontend
- Optimización automática de imágenes
- CDN global para mejor rendimiento

### Configuración
1. Crear cuenta en Cloudinary
2. Configurar upload preset
3. Configurar variables de entorno

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta .next a Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
npm run test          # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con coverage
```

## 📊 Performance

### Optimizaciones Implementadas
- **Image Optimization** con Next.js Image
- **Code Splitting** automático
- **Lazy Loading** de componentes
- **Bundle Analysis** con `@next/bundle-analyzer`

### Métricas Objetivo
- **Lighthouse Score**: >90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisar la documentación
2. Buscar en issues existentes
3. Crear un nuevo issue con detalles del problema

## 🔄 Próximas Características

- [ ] App móvil con React Native
- [ ] Dominios personalizados
- [ ] Plantillas de tienda
- [ ] Analytics avanzados
- [ ] Integración con WhatsApp
- [ ] Sistema de cupones
- [ ] Múltiples idiomas
- [ ] Modo oscuro
