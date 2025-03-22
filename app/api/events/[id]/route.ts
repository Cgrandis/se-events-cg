import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await context.params;

  const prisma = await getPrismaClient();

  try {
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
