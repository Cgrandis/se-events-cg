"use client";

import { useEventDetails } from "@/app/hooks/useEventDetails";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const { event, loading } = useEventDetails(id);

  if (loading) {
    return <p className="text-center">Loading event details...</p>;
  }

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Event Not Found</h1>
        <p className="text-gray-500">
          We couldn’t find the event you’re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700">{event.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
      </p>
    </div>
  );
}
