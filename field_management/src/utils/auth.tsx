import { loginData } from "@/types/interfaces/auth";
import FieldOwnerService from "@/services/field_owner.service";

export async function Login(formLogin: loginData) {
  try {
    const temp: any = await FieldOwnerService.checkAuth(formLogin);

    // Check if account exist
    if (Object.keys(temp).length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
