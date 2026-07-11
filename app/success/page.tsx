export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          SUKIA
        </p>

        <h1 className="mt-5 font-heading text-5xl tracking-[0.12em]">
          Pago recibido
        </h1>

        <p className="mt-6 text-sm leading-7 text-zinc-400">
          Gracias por tu compra. Tu pedido fue recibido y el pago fue procesado.
        </p>
      </div>
    </main>
  );
}