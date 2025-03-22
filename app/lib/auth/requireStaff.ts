import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/app/api/auth/getAuthOptions";
import { getPrismaClient } from "@/app/lib/prisma";

export async function requireStaff() {
  const authOptions = await getAuthOptions();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  const prisma = await getPrismaClient();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "STAFF") {
    redirect("/");
  }

  return { user, session };
}
