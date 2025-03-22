import { requireStaff } from "@/app/lib/auth/requireStaff";
import Header from "@/app/(components)/Header";
import Link from "next/link";

export default async function StaffDashboard() {
  await requireStaff();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header title="Staff Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Link href="/dashboard/create-event">
          <div className="p-4 bg-black text-white rounded-lg cursor-pointer text-center">
            Create a New Event
          </div>
        </Link>
        <Link href="/dashboard/manage-events">
          <div className="p-4 bg-black text-white rounded-lg cursor-pointer text-center">
            Manage Events
          </div>
        </Link>
        <Link href="/dashboard/manage-profile">
          <div className="p-4 bg-black text-white rounded-lg cursor-pointer text-center">
            Manage Profile
          </div>
        </Link>
        <Link href="/">
          <div className="p-4 bg-black text-white rounded-lg cursor-pointer text-center">
            View Events
          </div>
        </Link>
      </div>
    </div>
  );
}
