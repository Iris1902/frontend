"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(3),
  phoneNumber: z.string().min(7),
  address: z.string().min(3),
});

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "CUSTOMER" }),
      });
      if (!res.ok) throw new Error("Error en el registro");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("username")} placeholder="Usuario" className="input" />
        {errors.username && <span className="text-red-500">{errors.username.message as string}</span>}
        <input {...register("email")} placeholder="Email" className="input" />
        {errors.email && <span className="text-red-500">{errors.email.message as string}</span>}
        <input {...register("password")} type="password" placeholder="Contraseña" className="input" />
        {errors.password && <span className="text-red-500">{errors.password.message as string}</span>}
        <input {...register("fullName")} placeholder="Nombre completo" className="input" />
        {errors.fullName && <span className="text-red-500">{errors.fullName.message as string}</span>}
        <input {...register("phoneNumber")} placeholder="Teléfono" className="input" />
        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message as string}</span>}
        <input {...register("address")} placeholder="Dirección" className="input" />
        {errors.address && <span className="text-red-500">{errors.address.message as string}</span>}
        <button type="submit" className="btn-primary" disabled={isSubmitting}>Registrarse</button>
        {success && <div className="text-green-600">¡Registro exitoso!</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
