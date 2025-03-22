"use client";

import Link from "next/link";
import AuthInput from "@/app/(components)/AuthInput";
import { GoogleSignInButton } from "@/app/(components)/GoogleSignInButton";
import FormError from "@/app/(components)/FormError";
import { useLogin } from "@/app/hooks/useLogin";

export default function LoginPage() {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleSignIn,
  } = useLogin();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Login</h2>
      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`w-full bg-black text-white p-2 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">Or</p>
        <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={isLoading} />
      </div>

      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/auth/user-signup" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
