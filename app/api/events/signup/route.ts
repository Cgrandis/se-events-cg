import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "USER") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { eventId } = await req.json();

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const existingSignup = await prisma.eventSignup.findFirst({
      where: { userId: user.id, eventId },
    });

    if (existingSignup) {
      return NextResponse.json({ message: "Already signed up for this event" }, { status: 400 });
    }

    const newSignup = await prisma.eventSignup.create({
      data: {
        userId: user.id,
        eventId,
      },
    });

    return NextResponse.json({ message: "Successfully signed up for the event", signup: newSignup }, { status: 201 });
  } catch (error) {
    console.error("Error signing up for event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
