import type { Metadata } from 'next'

interface StoreLayoutProps {
  children: React.ReactNode
  params: Promise<{
    storeSlug: string
  }>
}

export async function generateMetadata({ params }: { params: Promise<{ storeSlug: string }> }): Promise<Metadata> {
  const { storeSlug } = await params
  const storeName = storeSlug.charAt(0).toUpperCase() + storeSlug.slice(1);

  return {
    title: `${storeName} - Tienda Online`,
    description: `Bienvenido a ${storeName}. Encuentra los mejores productos aquí.`,
  };
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 