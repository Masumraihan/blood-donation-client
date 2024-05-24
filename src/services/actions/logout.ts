"use server";

import { authKey } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logout = () => {
  const cookie = cookies();
  cookie.delete(authKey.token);
  redirect("/login");
};

export default logout;
