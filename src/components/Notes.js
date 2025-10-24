// import React, { useContext, useState } from 'react'
// import NoteContext from "../context/notes/noteContext";
// import NoteItem from './NoteItem';
// import AddNote from './AddNote';
// import { useEffect } from 'react';

// const Notes = () => {
//     const context = useContext(NoteContext);
//     const { notes, fetchNotes } = context;

//     useEffect(() => {
//         fetchNotes();
//         // eslint-disable-next-line
//     }, []);



//     return (
//         <>
//             <AddNote />
//             <div className="row my-5 g-4">
//                 <h2>Your Notes</h2>
//                 {notes.map((note) => {
//                     return <NoteItem key={note._id} note={note} />;
//                 })}
//             </div>
//         </>
//     )
// }

// export default Notes


// import React, { useContext, useState, useEffect } from "react";
// import NoteContext from "../context/notes/noteContext";
// import NoteItem from "./NoteItem";
// import AddNote from "./AddNote";


// const Notes = () => {
//   const context = useContext(NoteContext);
//   const { notes, fetchNotes, editnotes, deletenotes } = context;

//   const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
//   const [showEdit, setShowEdit] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     fetchNotes();
//     // eslint-disable-next-line
//   }, []);

//   // Edit modal open
//   const updateNote = (note) => {
//     setCurrentNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
//     setShowEdit(true);
//   };

//   // Handle edit save
//   const handleSave = () => {
//     editnotes(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
//     setShowEdit(false);
//   };

//   // Delete confirm modal
//   const confirmDelete = (id) => {
//     setDeleteId(id);
//   };

//   const handleDelete = () => {
//     deletenotes(deleteId);
//     setDeleteId(null);
//   };


//   return (
//     <>
//       <AddNote />

//       <div className="row my-5 g-4">
//         <h2>Your Notes</h2>
//         {notes.map((note) => (
//           <NoteItem key={note._id} note={note} updateNote={updateNote} confirmDelete={confirmDelete} />
//         ))}
//       </div>

//       {/* Edit Modal */}
//       {showEdit && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content shadow">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Note</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowEdit(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={currentNote.title}
//                   onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
//                 />
//                 <textarea
//                   className="form-control mb-2"
//                   value={currentNote.description}
//                   onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={currentNote.tag}
//                   onChange={(e) => setCurrentNote({ ...currentNote, tag: e.target.value })}
//                 />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setShowEdit(false)}>Cancel</button>
//                 <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm Modal */}
//       {deleteId && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content shadow">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this note?</p>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
//                 <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Notes;


import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import "../components Stylesheet/Notes.css";
import emptyNotesImg from "../assests/images/nonotes.png";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, fetchnotes, editnotes, deletenotes } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
  const [showEdit, setShowEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    document.title = "Notes - iNotebook";
    fetchnotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    setCurrentNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
    setErrors({});
    setShowEdit(true);
  };

  const validate = () => {
    let newErrors = {};
    if (!currentNote.title.trim()) newErrors.title = "Title is required";
    else if (currentNote.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";

    if (!currentNote.description.trim()) newErrors.description = "Description is required";
    else if (currentNote.description.trim().length < 3) newErrors.description = "Description must be at least 3 characters";

    if (!currentNote.tag.trim()) newErrors.tag = "Tag is required";
    else if (!currentNote.tag.startsWith("#")) newErrors.tag = "Tag must start with # (example: #todo)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    editnotes(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
    setSuccessMsg("Note updated successfully 🎉");
    setTimeout(() => {
      setSuccessMsg("");
      setShowEdit(false);
    }, 2000);
  };

  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    deletenotes(deleteId);
    setDeleteId(null);
  };

  return (
    <>
      <div className="container-fluid my-4">
        <div className="container">
          <div className="row">
            <h2 className="my-3 text-light fs-1 fw-bold">Your Notes</h2>
            {notes.length === 0 ? (
              <>
                <div className="d-flex">
                  <div className="empty-notes d-flex">
                    <img src={emptyNotesImg} alt="Empty Notes" />
                    <small className="text-light">
                      Looks you don’t have any notes yet. Start writing one!
                      </small>
                  </div>
                </div>
              </>
            ) : (
              <>
                {notes.map((note) => (
                  <NoteItem key={note._id} note={note} updateNote={updateNote} confirmDelete={confirmDelete} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {/* ✅ Custom Edit Modal */}
      {showEdit && (
        <div className="custom-modal show">
          <div className="custom-modal-dialog">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <h5 className="custom-modal-title">Edit Note</h5>
                <button type="button" className="custom-btn-close" onClick={() => setShowEdit(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="custom-modal-body">
                {successMsg && <div className="success-messages">{successMsg}</div>}

                <input
                  type="text"
                  className="form-control custom-input mb-1"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  placeholder="Title"
                />
                {errors.title && <div className="error-message">{errors.title}</div>}

                <textarea
                  className="form-control custom-input mb-1"
                  value={currentNote.description}
                  onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
                  placeholder="Description"
                  style={{ minHeight: "100px", resize: "vertical" }}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}

                <input
                  type="text"
                  className="form-control custom-input mb-1"
                  value={currentNote.tag}
                  onChange={(e) => setCurrentNote({ ...currentNote, tag: e.target.value })}
                  placeholder="#tag"
                />
                {errors.tag && <div className="error-message">{errors.tag}</div>}
              </div>
              <div className="custom-modal-footer">
                <button className="footer-btn btn-cancel" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
                <button className="footer-btn btn-save" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Custom Delete Confirm Modal */}
      {deleteId && (
        <div className="custom-modal show">
          <div className="custom-modal-dialog">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <h5 className="custom-modal-title">Confirm Delete</h5>
                <button type="button" className="custom-btn-close" onClick={() => setDeleteId(null)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="custom-modal-body">
                <p>Are you sure you want to delete this note?</p>
              </div>
              <div className="custom-modal-footer">
                <button className="footer-btn btn-cancel" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button className="footer-btn btn-save" style={{ background: "linear-gradient(45deg, #e74c3c, #c0392b)" }} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;