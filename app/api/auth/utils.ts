import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";

export async function verifyStaff() {
  const authOptions = await getAuthOptions();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "STAFF") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return user;
}
