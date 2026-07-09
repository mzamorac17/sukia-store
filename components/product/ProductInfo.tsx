import { motion } from "framer-motion";
import { product } from "@/lib/product";

export default function ProductInfo() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-lg uppercase tracking-[0.35em] text-zinc-500"
      >
        {product.collection}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-3 text-center font-heading text-6xl tracking-[0.16em] md:text-7xl"
      >
        {product.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-base uppercase tracking-[0.3em] text-zinc-500"
      >
        {product.subtitle}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-6xl font-light"
      >
        ₡{product.price.toLocaleString("es-CR")}
      </motion.h2>
    </>
  );
}