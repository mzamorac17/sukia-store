import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  const cookieStore = await cookies();

  cookieStore.set("sukia_admin", "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/admin");
}