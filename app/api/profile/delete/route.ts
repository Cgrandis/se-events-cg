import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { prisma } from "@/app/lib/prisma"; 

export async function DELETE() {
  const session = await getServerSession(await getAuthOptions());
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.delete({
    where: { email: session.user.email },
  });

  return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
}
