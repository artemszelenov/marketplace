import { logout } from "../../../services/api/auth"
import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
  const res = await logout()
  return res
};
