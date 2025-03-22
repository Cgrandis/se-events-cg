"use client";

import { useManageEvents } from "@/app/hooks/useManageEvents";

export default function ManageEvents() {
  const {
    events,
    editingEvent,
    formData,
    loading,
    handleDelete,
    handleEditClick,
    handleChange,
    handleUpdate,
    setEditingEvent,
  } = useManageEvents();

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
                <p className="text-sm text-gray-500">
                  {event.date} - {event.location}
                </p>
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
