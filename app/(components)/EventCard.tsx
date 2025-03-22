"use client";

import { EventCardProps } from "@/app/types/events";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EventCard({ event, isSignedUp, onSignUp, loading }: EventCardProps) {
  const { data: session } = useSession();

  return (
    <li className="flex flex-col justify-between h-72 p-6 border rounded-lg shadow bg-white space-y-2">
      <div>
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-gray-700 text-base leading-relaxed mt-2 mb-3 line-clamp-3">
          {event.description}
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-auto">
        📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
      </p>

      <div className="flex justify-between items-center mt-2">
        {session && isSignedUp ? (
          <p className="text-green-600 font-semibold">You&apos;re already in!</p>
        ) : (
          <button
            onClick={() => onSignUp(event.id, event.title, event.date, event.location)}
            className="bg-black text-white px-3 py-1 rounded text-sm"
            disabled={loading}
          >
            {loading ? "Signing..." : "Sign Up"}
          </button>
        )}

        <Link
          href={`/events/${event.id}`}
          className="text-blue-600 text-sm underline hover:text-blue-800 ml-auto"
        >
          View →
        </Link>
      </div>
    </li>
  );
}
