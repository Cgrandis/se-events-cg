import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { events: { select: { eventId: true } } },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const signedUpEvents = user.events.map((event: { eventId: string }) => event.eventId);

    return NextResponse.json({ signedUpEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching signed-up events:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
