import { useEffect, useState } from "react";
import { Event } from "@/app/types/events";

export function useEventDetails(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      try {
 
        const res = await fetch(`/api/events/${id}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  return { event, loading };
}
