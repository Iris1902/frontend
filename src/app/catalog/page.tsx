"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{username: string; fullName?: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está logueado (opcional)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Cargar productos siempre
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://domain-products-alb-98082677.us-east-1.elb.amazonaws.com/api/products-read/", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      
      if (!res.ok) throw new Error("Error al cargar productos");
      
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("No se pudieron cargar los productos desde la API. Mostrando productos de ejemplo.");
      
      // Productos de ejemplo si la API falla
      setProducts([
        {
          id: 1,
          name: "HP Victus Gaming",
          description: "Laptop gaming con procesador i7 y RTX 3060",
          price: "1100.00",
          stock: 5,
          image_url: "/gaming-laptop.jpg",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "MacBook Pro M2",
          description: "Laptop profesional con chip M2 y 16GB RAM",
          price: "2200.00",
          stock: 3,
          image_url: "/business-laptop.jpg",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: "Dell XPS 13",
          description: "Ultrabook premium con pantalla InfinityEdge",
          price: "1500.00",
          stock: 8,
          image_url: "/laptop1.jpg",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] flex items-center justify-center">
        <div className="text-white text-xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf]">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-fuchsia-400">TechStore</span> Catálogo
          </h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-white/80">Bienvenido, {user.fullName || user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <span className="text-white/60">Navegando como invitado</span>
                <Link
                  href="/auth/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Nuestros Productos</h2>
          <p className="text-white/80">Descubre las mejores laptops para gaming y trabajo profesional</p>
        </motion.div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center text-white/70 py-12">
            <p className="text-xl">No hay productos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Si la imagen no carga, mostrar un placeholder
                        (e.target as HTMLImageElement).src = "/laptop1.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Sin imagen</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-fuchsia-400">${product.price}</span>
                  <span className="text-white/60 text-sm">Stock: {product.stock}</span>
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Agotado" : "Ver Detalles"}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
