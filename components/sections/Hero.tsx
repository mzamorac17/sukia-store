"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductImage from "@/components/product/ProductImage";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "@/components/product/SizeSelector";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Hero() {
  const [size, setSize] = useState("M");

  return (
    <section className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-col items-center px-6">
        <ProductImage />

        <ProductInfo />

        <SizeSelector
  size={size}
  setSize={setSize}
/>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 w-full max-w-[360px] rounded-md bg-white py-4 text-black uppercase tracking-[0.25em] transition hover:bg-zinc-200"
        >
          Comprar ahora
        </motion.button>

        <p className="mt-5 mb-24 text-sm text-zinc-500">
          Pago seguro con Stripe
        </p>
      </div>
    </section>
  );
}