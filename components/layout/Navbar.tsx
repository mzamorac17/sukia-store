import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-8">
      <button className="text-sm uppercase tracking-[0.25em] text-white transition hover:opacity-60">
        Sobre Sukia
      </button>

      <Image
        src="/Logo.jpg"
        alt="SUKIA"
        width={210}
        height={60}
        priority
        className="w-[180px] h-auto opacity-90"
      />

      <div className="w-24" />
    </nav>
  );
}