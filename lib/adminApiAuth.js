import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function isAdminRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;

  const payload = await verifyToken(token);
  return Boolean(payload?.adminId);
}
