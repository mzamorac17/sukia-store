export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        action="/api/admin/login"
        method="POST"
        className="w-full max-w-sm border border-zinc-800 bg-[#080808] p-8"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          SUKIA ADMIN
        </p>

        <h1 className="mt-4 font-heading text-4xl tracking-[0.12em]">
          Acceso
        </h1>

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          className="mt-8 w-full border border-zinc-800 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-white"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-white py-4 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-zinc-200"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}