'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

export default function DemoPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-700">TiendaSaaS</span>
            </div>
            <div className="relative">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <span className="mr-2">🛒</span> Carrito ({cart.length})
              </button>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-10 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">¡Crea tu tienda online en minutos!</h1>
          <p className="text-lg sm:text-xl">Descubre cómo se vería tu tienda con productos reales y un carrito de compras funcional.</p>
        </div>
      </section>

      {/* Main Productos + Carrito */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Productos Disponibles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-contain p-4"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🛒 Tu Carrito
              </h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Formulario de consulta */}
      <section className="bg-white border-t py-10">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">¿Tienes dudas? ¡Contáctanos!</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={4} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="¿En qué podemos ayudarte?" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Enviar consulta</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="font-semibold">TiendaSaaS</span> &copy; {new Date().getFullYear()} &middot; Demo de plataforma de tiendas online
        </div>
      </footer>
    </div>
  )
} 