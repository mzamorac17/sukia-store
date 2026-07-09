"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { product } from "@/lib/product";

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedSize: string;
}

export default function CheckoutDrawer({
  open,
  onClose,
  selectedSize,
}: CheckoutDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-[#080808] px-8 py-8 text-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.3em]">
                Tu pedido
              </h2>

              <button
                onClick={onClose}
                className="rounded-full border border-zinc-800 p-2 transition hover:border-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-12 border-b border-zinc-800 pb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                {product.collection}
              </p>

              <h3 className="mt-3 font-heading text-3xl tracking-[0.14em]">
                {product.name}
              </h3>

              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
                Talla: {selectedSize}
              </p>

              <p className="mt-6 text-3xl font-light">
                ₡{product.price.toLocaleString("es-CR")}
              </p>
            </div>

            <form className="mt-8 flex flex-1 flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                type="tel"
                placeholder="Teléfono"
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                type="text"
                placeholder="Provincia"
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <textarea
                placeholder="Dirección exacta"
                rows={4}
                className="resize-none border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <button
                type="button"
                className="mt-auto w-full rounded-md bg-white py-5 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-zinc-200"
              >
                Continuar al pago
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}