"use server";
import { authKey } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type TOptions = {
  redirect?: string;
};
const setAccessToken = (token: string, options?: TOptions) => {
  cookies().set(authKey.token, token);
  if (options && options.redirect) {
    redirect(options.redirect);
  }
};

export default setAccessToken;
