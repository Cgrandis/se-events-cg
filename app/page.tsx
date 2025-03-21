"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

export default function LandingPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [signedUpEvents, setSignedUpEvents] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleSignUp = async (eventId: string, eventTitle: string, eventDate: string, eventLocation: string) => {
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
      setSignedUpEvents([...signedUpEvents, eventId]);

      const startTime = new Date(eventDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
      const endTime = new Date(new Date(eventDate).getTime() + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>

        {session ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              ☰ Menu
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                {session.user.role === "STAFF" ? (
                  <>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Staff Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/user/profile")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      My Profile
                    </button>
                  </>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
              </p>

              {session && signedUpEvents.includes(event.id) ? (
                <p className="text-green-600 font-bold mt-2">You&apos;re already in!</p>
              ) : (
                <button
                  onClick={() => handleSignUp(event.id, event.title, event.date, event.location)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
