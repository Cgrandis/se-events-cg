import { PageProps } from "@/app/types/auth";

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`, {
    cache: "no-store",
  });
  console.log("DATABASE_URL:", process.env.DATABASE_URL);


  if (!res.ok) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Event Not Found</h1>
        <p className="text-gray-500">We couldn’t find the event you’re looking for.</p>
      </div>
    );
  }

  const event = await res.json();

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
