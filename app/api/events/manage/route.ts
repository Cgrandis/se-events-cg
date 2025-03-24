import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyStaff } from "@/app/api/auth/utils";

export async function DELETE(req: Request) {
  const user = await verifyStaff();
  if (user instanceof NextResponse) return user;

  try {
    const { eventId } = await req.json();

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.organizerId !== user.id) {
      return NextResponse.json({ message: "Unauthorized: Only the organizer can delete this event" }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
