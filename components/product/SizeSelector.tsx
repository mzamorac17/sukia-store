"use client";

interface SizeSelectorProps {
  size: string;
  setSize: (size: string) => void;
}

const sizes = ["XS", "S", "M", "L", "XL"];

export default function SizeSelector({
  size,
  setSize,
}: SizeSelectorProps) {
  return (
    <div className="mt-8 flex gap-3">
      {sizes.map((item) => (
        <button
          key={item}
          onClick={() => setSize(item)}
          className={`h-14 w-14 border text-base transition-all duration-300 ${
            size === item
              ? "border-white bg-white text-black"
              : "border-zinc-700 text-white hover:border-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}