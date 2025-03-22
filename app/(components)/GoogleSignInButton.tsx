"use client";
import { GoogleSignInButtonProps } from "../types/auth";

export function GoogleSignInButton({ onClick, isLoading }: GoogleSignInButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-red-500 text-white p-2 rounded mt-2 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}
