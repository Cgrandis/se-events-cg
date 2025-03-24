import { Event } from "@/app/types/events";

export async function getEventDetails(id: string): Promise<Event | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://v0-se-events-cg.vercel.app";

  const res = await fetch(`${baseUrl}/api/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
