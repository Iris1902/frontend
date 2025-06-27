"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] flex flex-col items-center justify-center">
      <section className="w-full max-w-6xl mx-auto py-16 px-4 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold text-center text-white mb-6 drop-shadow-lg"
        >
          <span className="text-fuchsia-400">TechStore</span>{" "}
          <span className="text-blue-300">Laptops</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-xl md:text-3xl text-center text-white/90 mb-10 max-w-3xl"
        >
          La tienda online para gamers y profesionales que buscan potencia,
          diseño y tecnología de última generación.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="w-full max-w-3xl"
        >
          {/* Carrusel de imágenes */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-2xl mb-8 border-4 border-fuchsia-700/40">
            <Carousel />
          </div>
        </motion.div>
        <div className="flex gap-4 mt-4">
          <Link
            href="/auth/register"
            className="btn-primary bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg"
          >
            Regístrate
          </Link>
          <Link
            href="/auth/login"
            className="btn-secondary bg-blue-700 hover:bg-blue-800 text-white shadow-lg"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>
      {/* Sección para gamers */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row items-center gap-10 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <Image
            src="/gaming-laptop.jpg"
            alt="Laptop Gamer"
            width={500}
            height={350}
            className="rounded-xl shadow-xl border-2 border-fuchsia-700/40"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-300 mb-4">
            Para Gamers
          </h2>
          <p className="text-lg text-white/90 mb-2">
            Encuentra laptops con tarjetas gráficas de última generación,
            pantallas de alta tasa de refresco y diseños RGB que te harán
            destacar en cada partida.
          </p>
          <ul className="list-disc ml-6 text-white/80">
            <li>RTX y Radeon de última generación</li>
            <li>Teclados retroiluminados</li>
            <li>Refrigeración avanzada</li>
          </ul>
        </motion.div>
      </section>
      {/* Sección para empresarios */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row-reverse items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <Image
            src="/business-laptop.jpg"
            alt="Laptop Empresarial"
            width={500}
            height={350}
            className="rounded-xl shadow-xl border-2 border-blue-700/40"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-4">
            Para Empresarios
          </h2>
          <p className="text-lg text-white/90 mb-2">
            Laptops elegantes, ligeras y con gran autonomía para quienes
            necesitan productividad y potencia en cualquier lugar.
          </p>
          <ul className="list-disc ml-6 text-white/80">
            <li>Procesadores Intel y AMD de alto rendimiento</li>
            <li>Batería de larga duración</li>
            <li>Diseño premium y ultradelgado</li>
          </ul>
        </motion.div>
      </section>
      {/* Sección sobre la tienda */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          ¿Por qué elegir TechStore?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-lg text-white/90 mb-6 max-w-2xl"
        >
          Somos una tienda especializada en laptops para todos los perfiles.
          Ofrecemos asesoría personalizada, garantía y los mejores precios del
          mercado. ¡Compra seguro y recibe tu laptop en la puerta de tu casa!
        </motion.p>
        <div className="flex flex-wrap gap-6 justify-center">
          <Feature
            icon="/envio.svg"
            title="Envío rápido"
            desc="Recibe tu laptop en tiempo récord en todo el país."
          />
          <Feature
            icon="/garantia.svg"
            title="Garantía"
            desc="Todos nuestros productos cuentan con garantía oficial."
          />
          <Feature
            icon="/soporte.svg"
            title="Soporte"
            desc="Atención personalizada antes y después de tu compra."
          />
        </div>
      </section>
    </main>
  );
}

function Carousel() {
  // Imágenes de laptops (puedes reemplazar por imágenes reales luego)
  const images = ["/laptop1.jpg", "/laptop2.jpg", "/laptop3.jpg"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      3500
    );
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <motion.div className="w-full h-full relative">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute w-full h-full top-0 left-0"
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={src}
            alt={`Laptop ${i + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center bg-white/10 rounded-xl p-6 w-64 shadow-lg border border-white/20">
      <Image src={icon} alt={title} width={48} height={48} className="mb-2" />
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-white/80 text-sm">{desc}</p>
    </div>
  );
}
