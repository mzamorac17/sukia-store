import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-center px-10 py-8">
      <button className="absolute left-10 text-sm uppercase tracking-[0.25em] text-white transition hover:opacity-60">
  Sobre Sukia
</button>

      <Image
        src="/Logo.png"
        alt="SUKIA"
        width={210}
        height={60}
        priority
        className="h-auto w-[280px] opacity-90"
      />

      <div className="w-24" />
    </nav>
  );
}