"use server";

import { authKey } from "@/constants";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const createBloodRequest = async (values: FieldValues) => {
  const cookie = cookies();
  const token = cookie.get(authKey.token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token?.value || "",
    },
    body: JSON.stringify(values),
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
export default createBloodRequest;
