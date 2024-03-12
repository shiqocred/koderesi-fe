import { data } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const resi = data.find((item) => item.status === "delivered");
    return NextResponse.json(resi);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
