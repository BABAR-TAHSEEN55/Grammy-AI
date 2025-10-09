import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const CookiStore = await cookies();
  const GetCredits = CookiStore.get("AnonCredits");
  console.log(GetCredits?.value);
  const session = await auth();
  if (session?.user?.id) {
    const Credits = "inifinite";
    return NextResponse.json({ Credits });
  }
  const Credits = GetCredits?.value;
  return NextResponse.json({ Credits });
};
