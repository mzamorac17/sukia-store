import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!siteUrl) {
  throw new Error("Missing NEXT_PUBLIC_SITE_URL");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "crc",
            product_data: {
              name: body.productName,
              description: `Talla: ${body.selectedSize}`,
            },
            unit_amount: body.price * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: body.email,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        order_id: body.orderId,
        selected_size: body.selectedSize,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago." },
      { status: 500 }
    );
  }
}