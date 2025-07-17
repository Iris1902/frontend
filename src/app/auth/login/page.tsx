"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError("");
    setIsLoading(true);
    
    try {
      console.log("Intentando login para:", data.email);
      
      // Buscar usuario por email
      const res = await fetch(`https://domain-users-alb-1257413507.us-east-1.elb.amazonaws.com/api/users-read/search?email=${encodeURIComponent(data.email)}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      
      console.log("Respuesta status:", res.status);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Usuario no encontrado");
        }
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Error ${res.status}: Usuario no encontrado`);
      }
      
      const userData = await res.json();
      console.log("Datos del usuario recibidos:", userData);
      
      // Verificar si existe el usuario y la contraseña coincide
      // Nota: según tu ejemplo, la API devuelve 'passwordHash' no 'password'
      if (userData && (userData.passwordHash === data.password || userData.password === data.password)) {
        console.log("Login exitoso");
        // Login exitoso - guardar datos de usuario en localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        // Redirigir al catálogo
        router.push("/catalog");
      } else {
        console.log("Contraseña incorrecta");
        setError("Email o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error completo:", err);
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
          <p className="text-white/70">Accede a tu cuenta de TechStore</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input 
              {...register("email")} 
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1 block">{errors.email.message}</span>
            )}
          </div>
          
          <div>
            <input 
              {...register("password")} 
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.password && (
              <span className="text-red-400 text-sm mt-1 block">{errors.password.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/70">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold">
              Regístrate aquí
            </Link>
          </p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm block mt-2">
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
