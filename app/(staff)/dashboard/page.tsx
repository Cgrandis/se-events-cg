import { requireStaff } from "@/app/lib/auth/requireStaff";
import Link from "next/link";
import LogoutButton from "@/app/(components)/LogoutButton";

export default async function StaffDashboard() {
  const { session } = await requireStaff();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{session.user.email}</span>
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/create-event">
          <div className="p-4 bg-blue-500 text-white rounded-lg cursor-pointer text-center">
            Create a New Event
          </div>
        </Link>
        <Link href="/dashboard/manage-events">
          <div className="p-4 bg-green-500 text-white rounded-lg cursor-pointer text-center">
            Manage Events
          </div>
        </Link>
        <Link href="/dashboard/manage-profile">
          <div className="p-4 bg-yellow-500 text-white rounded-lg cursor-pointer text-center">
            Manage Profile
          </div>
        </Link>
        <Link href="/">
          <div className="p-4 bg-purple-500 text-white rounded-lg cursor-pointer text-center">
            View Events
          </div>
        </Link>
      </div>
    </div>
  );
}
