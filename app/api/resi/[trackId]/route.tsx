import { data } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  try {
    const id = params.trackId;

    if (!id) {
      return new NextResponse("Request Track Id", { status: 400 });
    }

    const resi = data.find((item) => item.id === id);

    return NextResponse.json(resi);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
