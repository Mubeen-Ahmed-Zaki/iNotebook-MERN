// import NoteContext from "../context/notes/noteContext";
// import { useContext } from 'react';

import '../components Stylesheet/NoteItem.css';

const NoteItem = ({ note, updateNote, confirmDelete }) => {
    const variants = ["variant-1", "variant-2", "variant-3", "variant-4", "variant-5", "variant-6", "variant-7", "variant-8", "variant-9", "variant-10", "variant-11"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    return (
        <div className="col-md-4">
            <div className={`card custom-card ${randomVariant} shadow-sm`}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <small className="card-tag">{note.tag}</small>
                    <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => updateNote(note)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-btn delete-btn" onClick={() => confirmDelete(note._id)}>
                            <i className="fas fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
