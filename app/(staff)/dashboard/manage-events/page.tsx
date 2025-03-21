"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", date: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/events/staff-list")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const response = await fetch(`/api/events/delete/${id}`, { method: "DELETE" });

    if (response.ok) {
      setEvents(events.filter((event) => event.id !== id));
    } else {
      alert("Error deleting event");
    }
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;
    setLoading(true);

    const response = await fetch("/api/events/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingEvent.id,
        ...formData,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Event updated successfully!");
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...formData } : event)));
      setEditingEvent(null);
    } else {
      alert("Error updating event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Your Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => handleEditClick(event)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(event.id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-2 border rounded mb-2" 
              placeholder="Event Title" 
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Event Description"
            />
            <input 
              type="datetime-local" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="w-full p-2 border rounded mb-2" 
            />
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className="w-full p-2 border rounded mb-2" 
              placeholder="Location" 
            />
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleUpdate} 
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save"}
              </button>
              <button 
                onClick={() => setEditingEvent(null)} 
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
