import NextAuth from "next-auth";
import { getAuthOptions } from "../getAuthOptions";

const handler = async () => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions);
};

export const GET = handler;
export const POST = handler;
