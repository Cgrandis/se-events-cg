import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyStaff } from "@/app/api/auth/utils";

export async function POST(req: Request) {
  const user = await verifyStaff(); 
  if (user instanceof NextResponse) return user; 

  try {
    const { title, description, date, location } = await req.json();

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        organizerId: user.id,
      },
    });

    return NextResponse.json({ message: "Event created successfully", event: newEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
