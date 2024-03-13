// import { loginData } from "@/types/interfaces/auth";
// import FieldOwnerService from "@/services/field_owner.service";

// import { NextApiRequest, NextApiResponse } from 'next';

// export async function Login(formLogin: loginData) {
//   try {
//     const temp: any = await FieldOwnerService.checkAuth(formLogin);

//     const expires = new Date(Date.now() + 10 * 1000);

//     if (temp != null) {
//       const user = {
//         username: temp[0].username,
//         email: temp[0].email,
//         role: temp[0].role,
//         expire: expires,
//       };
//       console.log(user);
//       const userString = JSON.stringify(user);

//       return user;
//     } else return false;
//   } catch (error) {
//     console.error(error);
//   }
// }

import { loginData } from "@/types/interfaces/auth";
import FieldOwnerService from "@/services/field_owner.service";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function Login(formLogin: loginData) {
  try {
    const temp: any = await FieldOwnerService.checkAuth(formLogin);
    console.log(temp[0]);

    const expires = new Date(Date.now() + 10 * 1000);

    if (temp != null) {
      const user = {
        username: temp[0].username,
        email: temp[0].email,
        role: temp[0].role,
        expire: expires,
      };

      // Convert user object to string
      const userString = JSON.stringify(user);

      // Set cookie
      // res.setHeader(
      //   "Set-Cookie",
      //   `userData=${encodeURIComponent(userString)}; Expires=${expires.toUTCString()}; Path=/; HttpOnly`,
      // );
      return user;
    } else return false;
  } catch (error) {
    console.error(error);
  }
}
