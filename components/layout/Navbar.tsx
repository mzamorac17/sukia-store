import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-center px-10 py-8">
      <button className="absolute left-10 top-7 text-sm uppercase tracking-[0.25em] text-white transition hover:opacity-60">
  Sobre Sukia
</button>

      <Image
        src="/Logo.png"
        alt="SUKIA"
        width={220}
        height={60}
        priority
        className="h-auto w-[480px] opacity-100"
      />

      <div className="w-12 justify-center" />
    </nav>
  );
}