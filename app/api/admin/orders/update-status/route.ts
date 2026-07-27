import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("sukia_admin")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData = await request.formData();

  const orderId = formData.get("orderId") as string;
  const action = formData.get("action") as string;

  if (!orderId || !action) {
    return NextResponse.json(
      { error: "Missing orderId or action" },
      { status: 400 }
    );
  }

  if (action === "mark_paid") {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "paid",
      })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  if (action === "mark_rejected") {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "rejected",
      })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  if (action === "mark_shipped") {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        order_status: "shipped",
      })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  if (action === "mark_delivered") {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        order_status: "delivered",
      })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  if (action === "cancel_order") {
    const { error: inventoryError } = await supabaseAdmin.rpc(
      "restore_inventory_for_order",
      {
        p_order_id: orderId,
      }
    );

    if (inventoryError) {
      return NextResponse.json(
        { error: inventoryError.message },
        { status: 500 }
      );
    }

    const { error: orderError } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "rejected",
        order_status: "cancelled",
      })
      .eq("id", orderId);

    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.redirect(new URL("/admin", request.url));
}