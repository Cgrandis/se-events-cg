"use client";

import { useManageProfile } from "@/app/hooks/useManageProfile";

export default function ManageProfile() {
  const {
    formData,
    userEmail,
    error,
    message,
    handleChange,
    handleUpdate,
    handleDelete,
  } = useManageProfile();

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Your Profile</h2>
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

        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-2 rounded mt-4"
      >
        Delete Account
      </button>
    </div>
  );
}
