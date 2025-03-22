"use client";

import PasswordInput from "@/app/(components)/PasswordInput";
import { GoogleSignInButton } from "@/app/(components)/GoogleSignInButton";
import FormError from "@/app/(components)/FormError";
import { SignUpFormProps } from "@/app/types/auth";
import { useSignUp } from "@/app/hooks/useSignUp";
import { signIn } from "next-auth/react";

export default function SignUpForm({ role }: SignUpFormProps) {
  const { formData, error, handleChange, handleSubmit } = useSignUp({ role });

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: role === "STAFF" ? "/dashboard" : "/",
      });
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {role === "STAFF" ? "Staff" : "User"} Sign Up
      </h2>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Sign Up
        </button>
      </form>

      <div className="mt-4">
        <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={false} />
      </div>
    </div>
  );
}
