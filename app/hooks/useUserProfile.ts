import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useUserProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile/get");
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setFormData({ name: data.name || "", password: "" });
        setUserEmail(data.email);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/profile/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage("Profile updated successfully!");
      setFormData({ ...formData, password: "" });
    } else {
      setError("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    const response = await fetch("/api/profile/delete", { method: "DELETE" });

    if (response.ok) {
      alert("Account deleted. Redirecting to home page.");
      router.push("/");
    } else {
      setError("Failed to delete account.");
    }
  };

  return {
    formData,
    userEmail,
    error,
    message,
    handleChange,
    handleUpdate,
    handleDelete,
  };
}
