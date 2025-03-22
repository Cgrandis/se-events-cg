import { useEffect, useState } from "react";
import { Event } from "@/app/types/events";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("/api/events/list");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    }
    fetchEvents();
  }, []);

  return events;
}
