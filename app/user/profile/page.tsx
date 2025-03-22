"use client";

import FormInput from "@/app/(components)/FormInput";
import Alert from "@/app/(components)/Alert";
import { useUserProfile } from "@/app/hooks/useUserProfile";

export default function UserProfile() {
  const {
    formData,
    userEmail,
    error,
    message,
    handleChange,
    handleUpdate,
    handleDelete,
  } = useUserProfile();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}

      <form onSubmit={handleUpdate} className="space-y-4">
        <FormInput label="Email (cannot be changed)" type="email" name="email" value={userEmail} disabled />
        <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
        <FormInput
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter new password"
          onChange={handleChange}
        />

        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Update Profile
        </button>
      </form>

      <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 rounded mt-4">
        Delete Account
      </button>
    </div>
  );
}
