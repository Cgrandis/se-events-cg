import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { getPrismaClient } from "@/app/lib/prisma"; 
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  const session = await getServerSession(await getAuthOptions());

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, password } = await req.json();

  const updateData: { name?: string; password?: string } = {};
  if (name) updateData.name = name;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  const prisma = await getPrismaClient(); 

  await prisma.user.update({
    where: { email: session.user.email },
    data: updateData,
  });

  return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
}
