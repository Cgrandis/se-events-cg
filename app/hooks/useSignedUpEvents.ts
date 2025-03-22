import { useEffect, useState } from "react";
import { Session } from "next-auth";

export function useSignedUpEvents(session: Session | null) {
  const [signedUpEvents, setSignedUpEvents] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      async function fetchSignedUpEvents() {
        const response = await fetch("/api/events/user-signed-up");
        if (response.ok) {
          const data = await response.json();
          setSignedUpEvents(data.signedUpEvents);
        }
      }
      fetchSignedUpEvents();
    }
  }, [session]);

  return signedUpEvents;
}
