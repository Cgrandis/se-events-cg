import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; 

export async function GET() {
  try {

    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
