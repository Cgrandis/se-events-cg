import { useEffect, useState } from "react";
import { Event } from "@/app/types/events";

export function useManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
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

  return {
    events,
    editingEvent,
    formData,
    loading,
    handleDelete,
    handleEditClick,
    handleChange,
    handleUpdate,
    setEditingEvent,
  };
}
