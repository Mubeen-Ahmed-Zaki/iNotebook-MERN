
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://i-notebook-mern-five.vercel.app"; // apna backend URL lagao
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // 📌 Fetch all Notes
  const fetchnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setNotes(data);
    } else {
      setNotes(data.notes || []);
    }
  };

  // 📌 Add a Note
  const addnotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note)); // UI update instantly
  };

  // 📌 Delete a Note
  const deletenotes = async (id) => {
    await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    // UI update
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // 📌 Edit a Note
  const editnotes = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Update frontend state (without refetching)
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, fetchnotes, addnotes, deletenotes, editnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
