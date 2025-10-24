//  sample tset

// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) => {
//     const s1 = {
//         name: "Ali",
//         class: "5th"
//     };

//     const [state, setState] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//             setState({
//                 name: "Ahmed",
//                 class: "9th"
//             })
//         }, 1500);
//     }

//     return (
//         <NoteContext.Provider value={{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     );
// };

// export default NoteState;


// -----------------------------------------------------------

// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) => {
//     const host = "http://localhost:5000";
//     const notesInitial = [];
//     const [notes, setNotes] = useState(notesInitial);

//     // Fetch all notes
//     const fetchNotes = async () => {
//         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token":
//                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYzY3YWFlZGJjZmEzYTYwMjhjYWE4In0sImlhdCI6MTc1NjEyOTIxMX0.spYaZGp2hx_5H71-Uj4k7gjh7pKPz2D4ty_RjjIZumU"
//             }
//         });
//         const data = await response.json();
//         console.log(data);

//         if (Array.isArray(data)) {
//             setNotes(data);
//         } else {
//             setNotes(data.notes || []);
//         }
//     };

//     //  Add note
//     const addnotes = async (title, description, tag) => {
//         const response = await fetch(`${host}/api/notes/addnotes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token":
//                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYzY3YWFlZGJjZmEzYTYwMjhjYWE4In0sImlhdCI6MTc1NjEyOTIxMX0.spYaZGp2hx_5H71-Uj4k7gjh7pKPz2D4ty_RjjIZumU"
//             },
//             body: JSON.stringify({ title, description, tag }),
//         });

//         const note = await response.json();
//         if (Array.isArray(notes)) {
//             setNotes(notes.concat(note));
//         } else {
//             setNotes([note]);
//         }
//     };

//     // delete notes
//     const deletenotes = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this note?");

//         if (!confirmDelete) {
//             return;
//         }
//         const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token":
//                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYzY3YWFlZGJjZmEzYTYwMjhjYWE4In0sImlhdCI6MTc1NjEyOTIxMX0.spYaZGp2hx_5H71-Uj4k7gjh7pKPz2D4ty_RjjIZumU"
//             },
//         });
//         const json = await response.json();
//         console.log("Deleted:", json);

//         // frontend state update
//         const newNotes = notes.filter((note) => note._id !== id);
//         setNotes(newNotes);
//     };

//     // edit notes
//     const editnotes = async (id, title, description, tag) => {
//         try {
//             // API call
//             const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth-token":
//                         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhhYzY3YWFlZGJjZmEzYTYwMjhjYWE4In0sImlhdCI6MTc1NjEyOTIxMX0.spYaZGp2hx_5H71-Uj4k7gjh7pKPz2D4ty_RjjIZumU",
//                 },
//                 body: JSON.stringify({ title, description, tag }),
//             });

//             const json = await response.json();
//             //   console.log("Updated:", json);

//             // frontend state update
//             let newNotes = JSON.parse(JSON.stringify(notes));
//             for (let index = 0; index < newNotes.length; index++) {
//                 const element = newNotes[index];
//                 if (element._id === id) {
//                     element.title = title;
//                     element.description = description;
//                     element.tag = tag;
//                     break;
//                 }
//             }
//             setNotes(newNotes);
//         } catch (error) {
//             console.error(error.message);
//         }
//     };

//     return (
//         <NoteContext.Provider value={{ notes, addnotes, deletenotes, editnotes, fetchNotes }}>
//             {props.children}
//         </NoteContext.Provider>
//     );
// };

// export default NoteState;


import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"; // apna backend URL lagao
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