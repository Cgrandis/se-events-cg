import { useState } from "react";
import { useRouter } from "next/navigation";
import { UseSignUpProps } from "../types/auth";

export function useSignUp({ role }: UseSignUpProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const apiRoute = role === "STAFF" ? "/api/auth/staff-signup" : "/api/auth/user-signup";

    const response = await fetch(apiRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      router.push(role === "STAFF" ? "/dashboard" : "/auth/login");
    } else {
      const data = await response.json();
      setError(data.message || "Something went wrong");
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  };
}
