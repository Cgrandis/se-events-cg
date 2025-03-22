"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeaderProps } from "../types/auth";

export default function Header({ title }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>

      {session ? (
        <div className="relative flex items-center gap-4">

          <span className="text-gray-700 text-sm">{session.user.email}</span>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            ☰ Menu
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
              {session.user.role === "STAFF" ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Staff Dashboard
                </button>
              ) : (
                <button
                  onClick={() => router.push("/user/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  My Profile
                </button>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </header>
  );
}
