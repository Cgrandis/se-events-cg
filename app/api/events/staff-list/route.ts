import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { getPrismaClient } from "@/app/lib/prisma";

export async function GET() {
  const prisma = await getPrismaClient(); 

  const session = await getServerSession(await getAuthOptions());

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const staffUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organizedEvents: true },
    });

    if (!staffUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ events: staffUser.organizedEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching staff events:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
