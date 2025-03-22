import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

export function useEventSignUp(session: Session | null, setSignedUpEvents: (cb: (prev: string[]) => string[]) => void) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (
    eventId: string,
    eventTitle: string,
    eventDate: string,
    eventLocation: string
  ) => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/events/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      alert("Successfully signed up for the event!");
      setSignedUpEvents((prev) => [...prev, eventId]);

      const startTime = new Date(eventDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
      const endTime = new Date(new Date(eventDate).getTime() + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventTitle
      )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
        "Join us for this event!"
      )}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

      const confirmAddToCalendar = confirm("Do you want to add this event to your Google Calendar?");
      if (confirmAddToCalendar) {
        window.open(googleCalendarUrl, "_blank");
      }
    } else {
      alert(result.message || "Error signing up for the event");
    }
  };

  return { handleSignUp, loading };
}
