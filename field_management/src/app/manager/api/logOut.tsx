import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";

import { deleteCookie, hasCookie } from "cookies-next";

//Check if user-cookie is still exist, if exist, delete that cookie
export default async function logOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const router = useRouter();
  if (hasCookie("userData") === true) {
    deleteCookie("userData");
  }
  router.push("/manager");
  res.status(200).json("Good");
}
