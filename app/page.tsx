"use client";

import { useSession } from "next-auth/react";
import Header from "@/app/(components)/Header";
import { useEvents } from "@/app/hooks/useEvents";
import { useSignedUpEvents } from "@/app/hooks/useSignedUpEvents";
import { useEventSignUp } from "@/app/hooks/useEventSignUp";
import EventCard from "@/app/(components)/EventCard";

export default function LandingPage() {
  const { data: session } = useSession();
  const events = useEvents();
  const signedUpEvents = useSignedUpEvents(session);
  const { handleSignUp, loading } = useEventSignUp(session, () => signedUpEvents);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Header title="Upcoming Events" />
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSignedUp={signedUpEvents.includes(event.id)}
              onSignUp={handleSignUp}
              loading={loading}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
