import { loginData } from "@/types/interfaces/auth";
import FieldOwnerService from "@/services/field_owner.service";

import { useRouter } from "next/router";
import { hasCookie, getCookie, deleteCookie } from "cookies-next";

export async function Login(formLogin: loginData) {
  try {
    const temp: any = await FieldOwnerService.checkAuth(formLogin);

    // Check if account exist
    return Object.keys("temp").length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
