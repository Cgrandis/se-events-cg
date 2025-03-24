import { Event } from "@/app/types/events";

export async function getEventDetails(id: string): Promise<Event | null> {
  const res = await fetch(`/api/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
