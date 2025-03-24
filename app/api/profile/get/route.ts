import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { prisma } from "@/app/lib/prisma"; 

export async function GET() {
  const session = await getServerSession(await getAuthOptions());

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ name: user.name, email: user.email }, { status: 200 });
}
