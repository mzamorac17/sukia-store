"use client";

import type { InventoryItem } from "@/types/inventory";

interface SizeSelectorProps {
  size: string;
  setSize: (size: string) => void;
  inventory: InventoryItem[];
}

export default function SizeSelector({
  size,
  setSize,
  inventory,
}: SizeSelectorProps) {
  return (
    <div className="mt-8 flex gap-3">
      {inventory.map((item) => {
        const isSelected = size === item.size;
        const isSoldOut = item.current_stock <= 0;

        return (
          <button
            key={item.size}
            onClick={() => {
              if (!isSoldOut) {
                setSize(item.size);
              }
            }}
            disabled={isSoldOut}
            className={`relative h-14 w-14 border text-base transition-all duration-300 ${
              isSelected
                ? "border-white bg-white text-black"
                : "border-zinc-700 text-white hover:border-white"
            } ${
              isSoldOut
                ? "cursor-not-allowed opacity-30 hover:border-zinc-700"
                : ""
            }`}
          >
            {item.size}

            {isSoldOut && (
              <span className="absolute left-1/2 top-1/2 h-[2px] w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            )}
          </button>
        );
      })}
    </div>
  );
}