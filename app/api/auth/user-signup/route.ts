import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getPrismaClient } from "@/app/lib/prisma"; // <- adjust if needed

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const prisma = await getPrismaClient(); // ← get Prisma with dynamic DB URL

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json({ message: "User account created", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
