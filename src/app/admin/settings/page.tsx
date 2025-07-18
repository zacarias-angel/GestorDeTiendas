"use client";

import { useState } from "react";

// TODO: Reemplazar con datos reales de la tienda obtenidos del backend
const initialStore = {
  name: "Mi Tienda",
  description: "Descripción de la tienda",
  primaryColor: "#3B82F6",
  secondaryColor: "#1F2937",
  logo: "",
  banner: "",
};

export default function StoreSettingsPage() {
  const [store, setStore] = useState(initialStore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Lógica para guardar cambios en el backend
    alert("Cambios guardados (simulado)");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Configuración de la Tienda</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la tienda</label>
          <input
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={store.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Color primario</label>
            <input
              type="color"
              name="primaryColor"
              value={store.primaryColor}
              onChange={handleChange}
              className="mt-1 block w-12 h-12 p-0 border-0"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Color secundario</label>
            <input
              type="color"
              name="secondaryColor"
              value={store.secondaryColor}
              onChange={handleChange}
              className="mt-1 block w-12 h-12 p-0 border-0"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo (URL)</label>
          <input
            type="text"
            name="logo"
            value={store.logo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Banner (URL)</label>
          <input
            type="text"
            name="banner"
            value={store.banner}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="https://..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
} 