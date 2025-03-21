import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, password } = await req.json();

  const updateData: { name?: string; password?: string } = {};
  if (name) updateData.name = name;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: updateData,
  });

  return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
}
