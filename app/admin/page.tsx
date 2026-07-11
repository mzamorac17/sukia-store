import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function AdminPage() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <h1 className="font-heading text-4xl">Admin</h1>

        <p className="mt-6 text-red-400">
          Error cargando pedidos: {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              SUKIA
            </p>

            <h1 className="mt-3 font-heading text-5xl tracking-[0.12em]">
              Pedidos
            </h1>
          </div>

          <p className="text-sm text-zinc-500">
            Total: {orders?.length ?? 0}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto border border-zinc-800">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-950 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <tr>
                <th className="px-4 py-4">Fecha</th>
                <th className="px-4 py-4">Cliente</th>
                <th className="px-4 py-4">Teléfono</th>
                <th className="px-4 py-4">Talla</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Entrega</th>
                <th className="px-4 py-4">Pago</th>
                <th className="px-4 py-4">Comprobante</th>
                <th className="px-4 py-4">Estado pago</th>
                <th className="px-4 py-4">Estado pedido</th>
                <th className="px-4 py-4">Dirección</th>
                <th className="px-4 py-4">Notas</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-900 text-zinc-300"
                >
                  <td className="px-4 py-4 text-zinc-500">
                    {new Date(order.created_at).toLocaleString("es-CR")}
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium text-white">
                      {order.full_name}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {order.email}
                    </div>
                  </td>

                  <td className="px-4 py-4">{order.phone}</td>

                  <td className="px-4 py-4">
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">
                      {order.selected_size}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    ₡{Number(order.price).toLocaleString("es-CR")}
                  </td>

                  <td className="px-4 py-4">
                    {order.delivery_method === "pickup"
                      ? "Retiro"
                      : "Envío"}
                  </td>

                  <td className="px-4 py-4 uppercase">
                    {order.payment_method}
                  </td>

                  <td className="px-4 py-4">
                    {order.sinpe_reference || "-"}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full border border-yellow-700/60 px-3 py-1 text-xs text-yellow-400">
                      {order.payment_status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs">
                      {order.order_status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-xs text-zinc-400">
                    <div>{order.province}</div>
                    <div>{order.canton}</div>
                    <div>{order.district}</div>
                    <div className="mt-2 text-zinc-300">{order.address}</div>
                 </td>

<td className="px-4 py-4 text-xs text-zinc-400">
  {order.notes || "-"}
</td>
                </tr>
              ))}

              {orders?.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    Todavía no hay pedidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}