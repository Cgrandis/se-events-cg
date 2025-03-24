import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req: Request) {

  const session = await getServerSession(await getAuthOptions());

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, description, date, location } = await req.json();

    const event = await prisma.event.findUnique({
      where: { id },
      include: { organizer: true },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.organizer.email !== session.user.email) {
      return NextResponse.json({ message: "Not authorized to edit this event" }, { status: 403 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { title, description, date, location },
    });

    return NextResponse.json({ message: "Event updated", event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
