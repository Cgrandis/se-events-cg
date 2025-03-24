import { Event } from "@/app/types/events";

export async function getEventDetails(id: string): Promise<Event | null> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
