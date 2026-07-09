"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { product } from "@/lib/product";
import { supabase } from "@/lib/supabase";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    canton: "",
    district: "",
    address: "",
    notes: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const order = {
      product_id: product.id,
      product_name: product.name,
      selected_size: selectedSize,
      price: product.price,

      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      province: formData.province,
      canton: formData.canton,
      district: formData.district,
      address: formData.address,
      notes: formData.notes,
    };

    const { error } = await supabase.from("orders").insert(order);

    if (error) {
      console.error("ORDER ERROR:", error);
      alert("Hubo un problema guardando el pedido.");
      setIsSubmitting(false);
      return;
    }

    alert("Pedido guardado correctamente.");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      province: "",
      canton: "",
      district: "",
      address: "",
      notes: "",
    });

    setIsSubmitting(false);
    onClose();
  }

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
                type="button"
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

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-1 flex-col gap-4"
            >
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Nombre completo"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Correo electrónico"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Teléfono"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
                type="text"
                placeholder="Provincia"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                name="canton"
                value={formData.canton}
                onChange={handleChange}
                type="text"
                placeholder="Cantón"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                type="text"
                placeholder="Distrito"
                required
                className="border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Dirección exacta"
                rows={3}
                required
                className="resize-none border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notas adicionales / referencia"
                rows={2}
                className="resize-none border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto w-full rounded-md bg-white py-5 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Continuar al pago"}
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}