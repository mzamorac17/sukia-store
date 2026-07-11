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

  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  province: "",
  canton: "",
  district: "",
  address: "",
  notes: "",
  paymentMethod: "sinpe",
  sinpeReference: "",
  deliveryMethod: "shipping",
});

  function handleChange(
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
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

      payment_method: formData.paymentMethod,
      sinpe_reference: formData.sinpeReference,
      delivery_method: formData.deliveryMethod,
    };

    const { data: orderId, error } = await supabase.rpc(
    "create_order_with_inventory", {
    p_product_id: order.product_id,
    p_product_name: order.product_name,
    p_selected_size: order.selected_size,
    p_price: order.price,

    p_full_name: order.full_name,
    p_email: order.email,
    p_phone: order.phone,
    p_province: order.province,
    p_canton: order.canton,
    p_district: order.district,
    p_address: order.address,
    p_notes: order.notes,

    p_payment_method: order.payment_method,
    p_sinpe_reference: order.sinpe_reference,
    p_delivery_method: order.delivery_method,
    });

    if (error) {
      console.error("ORDER ERROR:", error);
      alert("Hubo un problema guardando el pedido.");
      setIsSubmitting(false);
      return;
    }

    if (formData.paymentMethod === "card") {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      productName: product.name,
      selectedSize,
      price: product.price,
      email: formData.email,
    }),
  });

  const checkoutData = await response.json();

  if (!response.ok || !checkoutData.url) {
    console.error("STRIPE ERROR:", checkoutData);
    alert("No se pudo iniciar el pago con tarjeta.");
    setIsSubmitting(false);
    return;
  }

  window.location.href = checkoutData.url;
  return;
}
    setIsSubmitting(false);
    setOrderSubmitted(true);
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
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col overflow-hidden bg-[#080808] px-8 py-8 text-white shadow-2xl"
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
            {orderSubmitted ? (
  <div className="flex flex-1 flex-col items-center justify-center text-center">
    <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
      Pedido recibido
    </p>

    <h3 className="mt-5 font-heading text-4xl tracking-[0.12em]">
      Gracias por tu compra
    </h3>

    <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
      Tu orden quedó registrada correctamente. El pago queda pendiente de
      verificación y te contactaremos por WhatsApp para confirmar el proceso.
    </p>

    <div className="mt-10 w-full border border-zinc-800 p-5 text-left">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>Producto</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="mt-3 flex justify-between text-sm text-zinc-400">
        <span>Talla</span>
        <span className="text-white">{selectedSize}</span>
      </div>

      <div className="mt-3 flex justify-between text-sm text-zinc-400">
        <span>Total</span>
        <span className="text-white">
          ₡{product.price.toLocaleString("es-CR")}
        </span>
      </div>

      <div className="mt-3 flex justify-between text-sm text-zinc-400">
        <span>Estado</span>
        <span className="text-white">Pendiente</span>
      </div>
    </div>

    <button
      type="button"
      onClick={() => {
        setOrderSubmitted(false);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          province: "",
          canton: "",
          district: "",
          address: "",
          notes: "",
          paymentMethod: "sinpe",
          sinpeReference: "",
          deliveryMethod: "shipping",
        });

        onClose();
      }}
      className="mt-10 w-full rounded-md bg-white py-5 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-zinc-200"
    >
      Cerrar
    </button>
  </div>
) : (
  <> 
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
            className="mt-8 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-2"
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
              <select
  name="deliveryMethod"
  value={formData.deliveryMethod}
  onChange={handleChange}
  required
  className="border border-zinc-800 bg-[#080808] px-4 py-4 text-sm outline-none transition text-white focus:border-white"
>
  <option value="shipping">Envío a domicilio</option>
  <option value="pickup">Retiro local</option>
</select>

<select
  name="paymentMethod"
  value={formData.paymentMethod}
  onChange={handleChange}
  required
  className="border border-zinc-800 bg-[#080808] px-4 py-4 text-sm outline-none transition text-white focus:border-white"
>
  <option value="sinpe">SINPE Móvil</option>
  <option value="cash">Efectivo / retiro local</option>
  <option value="card">Tarjeta</option>
</select>

{formData.paymentMethod === "sinpe" && (
  <div className="border border-zinc-800 p-4">
    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
      Pago por SINPE
    </p>

    <p className="mt-3 text-sm text-zinc-300">
      Realiza el pago por SINPE Móvil por:
    </p>

    <p className="mt-3 text-2xl font-light">
      ₡{product.price.toLocaleString("es-CR")}
    </p>

    <p className="mt-3 text-sm text-zinc-400">
      Número SINPE: <span className="text-white">8571-1510</span>
    </p>

    <p className="mt-2 text-xs text-zinc-500">
      En el detalle coloca: SUKIA {selectedSize}
    </p>

    <input
      name="sinpeReference"
      value={formData.sinpeReference}
      onChange={handleChange}
      type="text"
      placeholder="Número de comprobante SINPE"
      required={formData.paymentMethod === "sinpe"}
      className="mt-4 w-full border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
    />
  </div>
)}
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
            className="sticky bottom-0 mt-4 w-full rounded-md bg-white py-5 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
  {isSubmitting ? "Guardando..." : "Continuar al pago"}
</button>
            </form>
  </>
)}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}