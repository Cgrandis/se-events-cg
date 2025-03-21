"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
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
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    const response = await fetch("/api/profile/delete", {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Account deleted. Redirecting to home page.");
      router.push("/");
    } else {
      setError("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email (cannot be changed)</label>
          <input
            type="email"
            value={userEmail}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>

      <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 rounded mt-4">
        Delete Account
      </button>
    </div>
  );
}
