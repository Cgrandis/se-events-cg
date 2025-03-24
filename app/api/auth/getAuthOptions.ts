import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export async function getAuthOptions(): Promise<NextAuthOptions> {
  return {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid email or password");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return { id: user.id, email: user.email, role: user.role };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === "google") {
          if (!user.email) throw new Error("Google account is missing an email");

          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true },
          });

          if (!existingUser) {
            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "Unknown",
                password: "",
                accounts: {
                  create: [{
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    type: account.type,
                  }],
                },
              },
              include: { accounts: true },
            });
          } else {
            const existingAccount = await prisma.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
            });

            if (!existingAccount) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                },
              });
            }
          }
        }

        return true;
      },
      async session({ session, token }) {
        if (token) {
          session.user = {
            id: token.id as string,
            email: token.email,
            role: token.role as "USER" | "STAFF",
          };
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.role = user.role;
        } else {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email ?? "" },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
          }
        }

        return token;
      },
      async redirect({ url, baseUrl }) {
        if (url === "/dashboard") return `${baseUrl}/dashboard`;
        return baseUrl;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
    debug: true,
  };
}
