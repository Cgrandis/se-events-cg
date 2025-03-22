import { useState } from "react";
import { useRouter } from "next/navigation";

export function useCreateEvent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Event created successfully!");
      setFormData({ title: "", description: "", date: "", location: "" });
      router.push("/");
    } else {
      alert("Error creating event");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
