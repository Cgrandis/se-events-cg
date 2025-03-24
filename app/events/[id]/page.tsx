import { PageProps } from "@/app/types/auth";
import { getEventDetails } from "@/app/hooks/getEventDetails";

export default async function EventDetailsPage({ params }: PageProps) {
  const event = await getEventDetails(params.id);

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Event Not Found</h1>
        <p className="text-gray-500">We couldn’t find the event you’re looking for.</p>
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
