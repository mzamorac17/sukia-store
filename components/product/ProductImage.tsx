import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <Image
        src="/jersey-front.png"
        alt="Oophaga Pumilio"
        width={620}
        height={620}
        priority
        className="h-auto w-[520px] transition-transform duration-500 hover:scale-105"
      />
    </motion.div>
  );
}