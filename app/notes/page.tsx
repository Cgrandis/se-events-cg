'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Note = {
  id: number;
  title: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase.from('notes').select();
      if (error) {
        console.error('Error fetching notes:', error);
      } else if (data) {
        setNotes(data as Note[]);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="p-3 border rounded shadow-sm bg-white">
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
