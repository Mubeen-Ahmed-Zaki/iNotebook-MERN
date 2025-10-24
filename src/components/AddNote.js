// import NoteContext from "../context/notes/noteContext";
// import { useContext, useState } from "react";
// import '../AddNote.css'

// const AddNote = () => {
//     const context = useContext(NoteContext);
//     const { addnotes } = context;

//     const [note, setNote] = useState({ title: "", description: "", tag: "" });
//     const [errors, setErrors] = useState({}); // error state

//     // Validation function
// const validate = () => {
//     let newErrors = {};
//     if (!note.title.trim()) {
//         newErrors.title = "Title is required";
//     } else if (note.title.trim().length < 3) {
//         newErrors.title = "Title must be at least 3 characters";
//     }

//     if (!note.description.trim()) {
//         newErrors.description = "Description is required";
//     } else if (note.description.trim().length < 3) {
//         newErrors.description = "Description must be at least 3 characters";
//     }

//     if (!note.tag.trim()) {
//         newErrors.tag = "Tag is required";
//     } else if (!note.tag.startsWith("#")) {
//         newErrors.tag = "Tag must start with # (example: #todo)";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
// };

// const onhandleAddnote = (e) => {
//     e.preventDefault();

//     if (!validate()) return; // agar error hai to stop

//     addnotes(note.title, note.description, note.tag);
//     setNote({ title: "", description: "", tag: "" }); // reset after add
//     setErrors({});
// };

//     const onchange = (e) => {
//         setNote({ ...note, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="my-5">
//             <h2 className="my-4">Add Notes</h2>
//             <form>
//                 {/* Title */}
//                 <div className="mb-3">
//                     <label htmlFor="title" className="form-label">Title</label>
//                     <input
//                         type="text"
//                         className={`form-control ${errors.title ? "is-invalid" : ""}`}
//                         id="title"
//                         name="title"
//                         value={note.title}
//                         onChange={onchange}
//                     />
//                     {errors.title && <div className="invalid-feedback">{errors.title}</div>}
//                 </div>

//                 {/* Description */}
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <textarea
//                         className={`form-control ${errors.description ? "is-invalid" : ""}`}
//                         id="description"
//                         name="description"
//                         value={note.description}
//                         onChange={onchange}
//                     />
//                     {errors.description && (
//                         <div className="invalid-feedback">{errors.description}</div>
//                     )}
//                 </div>

//                 {/* Tag */}
//                 <div className="mb-3">
//                     <label htmlFor="tag" className="form-label">Tag</label>
//                     <input
//                         type="text"
//                         className={`form-control ${errors.tag ? "is-invalid" : ""}`}
//                         id="tag"
//                         name="tag"
//                         value={note.tag}
//                         onChange={onchange}
//                     />
//                     {errors.tag && <div className="invalid-feedback">{errors.tag}</div>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="btn btn-primary"
//                     onClick={onhandleAddnote}
//                 >
//                     Add Note
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddNote;


import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import "../components Stylesheet/AddNote.css";



const AddNote = () => {

  useEffect(()=>{
    document.title = "AddNote - iNotebook";
  },[])


  const context = useContext(NoteContext);
  const { addnotes } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // validation
  const validate = () => {
    let newErrors = {};
    if (!note.title.trim()) {
      newErrors.title = "Title is required for your amazing note!";
    } else if (note.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!note.description.trim()) {
      newErrors.description = "Description helps bring your idea to life!";
    } else if (note.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters";
    }

    if (!note.tag.trim()) {
      newErrors.tag = "Tag helps organize your notes better!";
    } else if (!note.tag.startsWith("#")) {
      newErrors.tag = "Tag must start with # (example: #todo)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const onhandleAddnote = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addnotes(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      setLoading(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3500);
    }, 2000);
  };

  // floating particles
  useEffect(() => {
    const particles = document.getElementById("particles");
    if (particles && particles.childNodes.length === 0) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.width = Math.random() * 4 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + "s";
        particle.style.animationDuration = Math.random() * 4 + 4 + "s";
        particles.appendChild(particle);
      }
    }
  }, []);

  return (
    <>


      <div className="d-flex justify-content-center align-items-center">

        {/* Floating Particles */}
        <div className="particles" id="particles"></div>
        <div className="pt-5 main-container">
          <div className="addnote-body d-flex justify-content-center align-items-center">
            {/* Floating Particles */}
            <div className="particles" id="particles"></div>
            <div className="main-container">

              <div className="form-wrapper">
                {/* <!-- From Uiverse.io by Jedi-hongbin --> */}
                <button className="button-button" onClick={() => window.history.back()}>
                  <i className="fas fa-regular fa-arrow-left animated-arrow text-light"></i>
                  <span className="text-light">Back</span>
                </button>
                {/* Floating Icons */}
                <div className="floating-icons">
                  <div className="floating-icon"><i className="fas fa-star"></i></div>
                  <div className="floating-icon"><i className="fas fa-heart"></i></div>
                  <div className="floating-icon"><i className="fas fa-gem"></i></div>
                </div>

                {/* Header */}
                <div className="form-header">
                  <h2 className="form-title">Create Amazing Notes</h2>
                  <p className="form-subtitle">Bring your ideas to life with style</p>
                </div>

                {/* Success message */}
                {success && (
                  <div className="success-message">
                    <i className="fas fa-check-circle me-2"></i>
                    Wow! Your note has been created successfully! 🎉
                  </div>
                )}

                {/* Form */}
                <form onSubmit={onhandleAddnote}>

                  {/* Title */}
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control form-input custom-input"
                      id="noteTitle"
                      name="title"
                      value={note.title}
                      onChange={handleChange}
                      placeholder="Tag"
                    />
                    <label htmlFor="noteTitle"><i className="fas fa-heading me-2"></i> Title </label>
                    {errors.title && <div className="error-message">{errors.title}</div>}
                  </div>

                  {/* Description */}
                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control form-input custom-input"
                      id="noteDescription"
                      name="description"
                      value={note.description}
                      onChange={handleChange}
                      placeholder="Description"
                      style={{ height: "120px" }}
                    ></textarea>
                    <label htmlFor="noteDescription"><i className="fas fa-file-alt me-2"></i> Description</label>
                    {errors.description && <div className="error-message">{errors.description}</div>}
                  </div>

                  {/* Tag */}
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control form-input custom-input"
                      id="noteTag"
                      name="tag"
                      value={note.tag}
                      onChange={handleChange}
                      placeholder="Tag"
                    />
                    <label htmlFor="noteTag"><i className="fas fa-tags me-2"></i> Tag</label>
                    {errors.tag && <div className="error-message">{errors.tag}</div>}
                  </div>

                  {/* Submit */}
                  <div className="submit-section">
                    <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`}>
                      {!loading && <><i className="fas fa-rocket me-2"></i> Launch Note</>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;