'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

interface ProductFormData {
  name: string
  price: string
  category: string
  stock: string
  description: string
  image: string
  status: string
}

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: '',
    status: 'active'
  })

  const [imagePreview, setImagePreview] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [useExistingImage, setUseExistingImage] = useState(true)

  const categories = [
    "men's clothing",
    "women's clothing",
    'jewelery',
    'electronics'
  ]

  // Cargar datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const product: Product = await response.json()
        
        setFormData({
          name: product.title,
          price: product.price.toString(),
          category: product.category,
          stock: '50', // FakeStore no tiene stock, usamos valor por defecto
          description: product.description,
          image: product.image,
          status: 'active'
        })
        
        setImagePreview(product.image)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido')
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB')
        return
      }

      setImageFile(file)
      setUseExistingImage(false)
      
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!useExistingImage && !imageFile) {
      alert('Por favor selecciona una imagen para el producto')
      return
    }

    // TODO: Implementar llamada al backend
    console.log('Producto a actualizar:', formData)
    if (imageFile) {
      console.log('Nueva imagen:', imageFile)
    } else {
      console.log('Usando imagen existente')
    }
    alert('Producto actualizado exitosamente')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
        <Link
          href="/test"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          👁️ Ver Mi Tienda
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Camiseta Básica"
            />
          </div>

          {/* Precio */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="29.99"
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {/* Imagen */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            
            {/* Opción para usar imagen existente */}
            <div className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useExistingImage}
                  onChange={(e) => setUseExistingImage(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Usar imagen existente</span>
              </label>
            </div>

            {!useExistingImage && (
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              Formatos: JPG, PNG, GIF. Máximo 5MB
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe el producto..."
          />
        </div>

        {/* Vista previa de imagen */}
        {imagePreview && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vista Previa
            </label>
            <div className="w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
              <Image
                src={imagePreview}
                alt="Vista previa"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="mt-8 flex justify-end space-x-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Actualizar Producto
          </button>
        </div>
      </form>
    </div>
  )
} 