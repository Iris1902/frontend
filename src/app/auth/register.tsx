"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const schema = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phoneNumber: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  address: z.string().min(3, "La dirección debe tener al menos 3 caracteres"),
});

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("https://domain-users-alb-1257413507.us-east-1.elb.amazonaws.com/api/users-create/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "CUSTOMER" }),
      });
      if (!res.ok) throw new Error("Error en el registro");
      setSuccess(true);
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
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
          <h2 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
          <p className="text-white/70">Únete a TechStore y encuentra tu laptop ideal</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input 
              {...register("username")} 
              placeholder="Nombre de usuario"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.username && (
              <span className="text-red-400 text-sm mt-1 block">{errors.username.message}</span>
            )}
          </div>
          
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
          
          <div>
            <input 
              {...register("fullName")} 
              placeholder="Nombre completo"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.fullName && (
              <span className="text-red-400 text-sm mt-1 block">{errors.fullName.message}</span>
            )}
          </div>
          
          <div>
            <input 
              {...register("phoneNumber")} 
              placeholder="Número de teléfono"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.phoneNumber && (
              <span className="text-red-400 text-sm mt-1 block">{errors.phoneNumber.message}</span>
            )}
          </div>
          
          <div>
            <input 
              {...register("address")} 
              placeholder="Dirección"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
            />
            {errors.address && (
              <span className="text-red-400 text-sm mt-1 block">{errors.address.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Crear Cuenta"}
          </button>
          
          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-center">
              ¡Registro exitoso! Redirigiendo al login...
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/70">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold">
              Inicia sesión aquí
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
