"use client";

import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import type { InventoryItem } from "@/types/inventory";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductImage from "@/components/product/ProductImage";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "@/components/product/SizeSelector";
import CheckoutDrawer from "@/components/checkout/CheckoutDrawer";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Hero() {
  const [size, setSize] = useState("M");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  useEffect(() => {
  async function loadInventory() {
    const { data, error } = await supabase.rpc("get_product_inventory", {
      p_product_id: 1,
    });

    if (error) {
      console.error("INVENTORY LOAD ERROR:", error);
      return;
    }

    setInventory(data ?? []);

    const firstAvailableSize = data?.find(
      (item) => item.current_stock > 0
    );

    if (firstAvailableSize) {
      setSize(firstAvailableSize.size);
    }
  }

  loadInventory();
}, []);
const hasStock = inventory.some((item) => item.current_stock > 0);
  return (
    <section className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-col items-center px-6">
        <ProductImage />

        <ProductInfo />

        <SizeSelector
        size={size}
        setSize={setSize}
        inventory={inventory}
/>
        <motion.button
          onClick={() => setCheckoutOpen(true)}
          disabled={!hasStock}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 w-full max-w-[360px] rounded-md bg-white py-4 text-black uppercase tracking-[0.25em] transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {hasStock ? "Comprar ahora" : "Sold out"}
        </motion.button>

        <p className="mt-5 mb-24 text-sm text-zinc-500">
          Pago seguro.
        </p>
      </div>
    <CheckoutDrawer
  open={checkoutOpen}
  onClose={() => setCheckoutOpen(false)}
  selectedSize={size}
/>
    </section>
  );
}