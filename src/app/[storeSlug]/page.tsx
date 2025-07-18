interface StorePageProps {
  params: {
    storeSlug: string
  }
}
import Image from 'next/image';

export default function StorePage({ params }: StorePageProps) {
  // TODO: Obtener datos de la tienda y productos desde el backend
  const storeName = params.storeSlug.charAt(0).toUpperCase() + params.storeSlug.slice(1)
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Camiseta Básica',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'Ropa',
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      name: 'Zapatillas Deportivas',
      price: 89.99,
      originalPrice: 89.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'Calzado',
      rating: 4.8,
      reviews: 256,
      inStock: true
    },
    {
      id: 3,
      name: 'Auriculares Bluetooth',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'Electrónicos',
      rating: 4.2,
      reviews: 89,
      inStock: false
    },
    {
      id: 4,
      name: 'Reloj Inteligente',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'Electrónicos',
      rating: 4.7,
      reviews: 156,
      inStock: true
    },
  ]

  const categories = [
    { name: 'Ropa', count: 24, image: 'https://via.placeholder.com/200x200' },
    { name: 'Calzado', count: 12, image: 'https://via.placeholder.com/200x200' },
    { name: 'Electrónicos', count: 18, image: 'https://via.placeholder.com/200x200' },
    { name: 'Accesorios', count: 8, image: 'https://via.placeholder.com/200x200' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Bienvenido a {storeName}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Descubre nuestra colección de productos únicos y de alta calidad.
            </p>
            <div className="mt-10">
              <a
                href="#products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50"
              >
                Ver Productos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Explora por Categoría
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{category.count} productos</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Agotado</span>
                  </div>
                )}
                {product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    Oferta
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  {product.originalPrice > product.price && (
                    <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">({product.reviews})</p>
              </div>
              <div className="mt-4">
                <button
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Mantente al día
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Suscríbete para recibir las últimas ofertas y novedades.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs rounded-md"
                  placeholder="Tu correo electrónico"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Suscribirse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 